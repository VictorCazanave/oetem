<template>
  <BasePage
    title="What?"
    quote="There is no such thing as bad weather, only different kinds of good weather."
    author="John Ruskin"
    :subtitles="[
			'Choose the range of temperature you like:', 
			'Choose the kinds of sky you like:'
		]"
    submit-label="Search"
    :valid="selectedSkyIds.length > 0"
    previous-route="Where"
    @submit="save"
  >
    <template #section0>
      <VueSlider
        v-model="selectedTemperature"
        v-bind="{...temperature}"
        :enable-cross="false"
        :drag-on-click="true"
        tooltip="always"
        tooltip-placement="bottom"
        tooltip-formatter="{value}°C"
        height="8px"
        :dot-size="20"
      ></VueSlider>
    </template>

    <template #section1>
      <div class="group">
        <InputSky
          v-for="sky in sortedSkys"
          :key="sky.id"
          v-model="selectedSkyIds"
          :sky="sky"
        ></InputSky>
      </div>
    </template>
  </BasePage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import VueSlider from 'vue-slider-component'
import Sky from '@/models/Sky'
import Temperature from '@/models/Temperature'
import BasePage from '@/components/Base/BasePage.vue'
import InputSky from '@/components/Input/InputSky.vue'

@Component({
	components: {
		BasePage,
		InputSky,
		VueSlider
	}
})
export default class WhatView extends Vue {
	selectedSkyIds: string[] = []
	selectedTemperature: number[] = []
	
	@State skys!: Sky[]
	@State temperature!: Temperature

	get sortedSkys(): Sky[] {
		return [...this.skys].sort((sky1, sky2) => Number(sky1.id) - Number(sky2.id))
	}

	created() {
		if(this.$route.query.skys) {
			this.selectedSkyIds = Array.isArray(this.$route.query.skys)
				? this.$route.query.skys as string[]
				: [this.$route.query.skys]
		}

		if(this.$route.query.min) {
			this.selectedTemperature[0] = Number(this.$route.query.min)
		} else {
			this.selectedTemperature[0] = this.temperature.min
		}

		if(this.$route.query.max) {
			this.selectedTemperature[1] = Number(this.$route.query.max)
		} else {
			this.selectedTemperature[1] = this.temperature.max
		}
	}

	save(): void {
		this.$router.push({ 
			name: 'Matches',
			query: { 
				...this.$route.query,
				skys: this.selectedSkyIds,
				min: this.selectedTemperature[0].toString(),
				max: this.selectedTemperature[1].toString()
			}
		})
	}
}
</script>
