<template>
  <BasePage
    title="What?"
    quote="There is no such thing as bad weather, only different kinds of good weather."
    author="John Ruskin"
    submit-label="Search"
    :is-valid="selectedSkys.length > 0"
    previous-route="Where"
    @submit="save"
  >
    <label
      v-for="sky in skys"
      :key="sky.id"
    >
      <input
        v-model="selectedSkys"
        type="checkbox"
        :value="sky.id"
      />
      {{ sky.label }}
    </label>

    <input
      v-model="selectedTemperature.min"
      type="text"
    >

    <input
      v-model="selectedTemperature.max"
      type="text"
    >
  </BasePage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Sky from '@/models/Sky'
import Temperature from '@/models/Temperature'
import BasePage from '@/components/BasePage.vue'

@Component({
	components: {
    BasePage
  }
})
export default class WhatView extends Vue {
	selectedSkys: string[] = []
	selectedTemperature: Temperature = {min: 0, max: 50}
	
	@State skys!: Sky[]
	@State temperature!: Temperature

	created() {
		if(this.$route.query.skys) {
			this.selectedSkys = Array.isArray(this.$route.query.skys)
				? this.$route.query.skys as string[]
				: [this.$route.query.skys]
		}

		if(this.$route.query.min) {
			this.selectedTemperature.min = Number(this.$route.query.min)
		}

		if(this.$route.query.max) {
			this.selectedTemperature.max = Number(this.$route.query.max)
		}
	}

	save(): void {
		this.$router.push({ 
			name: 'Matches',
			query: { 
				...this.$route.query,
				skys: this.selectedSkys,
				min: this.selectedTemperature.min.toString(),
				max: this.selectedTemperature.max.toString()
			}
		})
	}
}
</script>
