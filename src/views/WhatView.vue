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
        :use-keyboard="true"
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
import { 
	getStoredMinTemperature, 
	getStoredMaxTemperature,
	getStoredSkys,
	storeMinTemperature,
	storeMaxTemperature,
	storeSkys 
} from '@/utilities'
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
	selectedTemperature: number[] = []
	selectedSkyIds = getStoredSkys()
	
	@State temperature!: Temperature
	@State skys!: Sky[]

	get sortedSkys(): Sky[] {
		return [...this.skys].sort((sky1, sky2) => Number(sky1.id) - Number(sky2.id))
	}

	created() {
		// this.temperature is not available before
		this.selectedTemperature[0] = getStoredMinTemperature(this.temperature.min)
		this.selectedTemperature[1] = getStoredMaxTemperature(this.temperature.max)
	}

	save(): void {
		storeMinTemperature(this.selectedTemperature[0])
		storeMaxTemperature(this.selectedTemperature[1])
		storeSkys(this.selectedSkyIds)
		this.$router.push({ name: 'Matches' })
	}
}
</script>
