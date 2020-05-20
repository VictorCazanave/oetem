<template>
  <section>
    <h1>Matches</h1>

    <nav>
      <button @click="back">
        Previous
      </button>
    </nav>

    <BaseQuote
      quote="Climate is what we expect, weather is what we get."
      author="Mark Twain"
    ></BaseQuote>

    <ul>
      <li
        v-for="location in matchedLocations"
        :key="location.geocode"
      >
        {{ location.name }}
        {{ location.areaName }}
        {{ location.geocode }}
        {{ location.lon }}
        {{ location.lat }}
        {{ location.weather.minTemperature.value }}
        {{ location.weather.minTemperature.unit }}
        {{ location.weather.maxTemperature.value }}
        {{ location.weather.maxTemperature.unit }}
        {{ location.weather.sky.id }}
        {{ location.weather.sky.label }}
      </li>
    </ul>

    <RouterLink :to="{ name: 'Home' }">
      Home
    </RouterLink>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SERVICES from '@/services'
import Location from '@/models/Location'
import Temperature from '@/models/Temperature'
import { getMatches } from '@/utilities'
import BaseQuote from '@/components/BaseQuote.vue'

@Component({
	components: { BaseQuote }
})
export default class MatchesView extends Vue {
	selectedDate = ''
	selectedAreas: string[] = []
	selectedSkys: string[] = []
	selectedTemperature: Temperature = { min: 0 , max: 0 }
	matchedLocations: Location[] = []


	created() {
		// TODO: Check if all query params exist
		// TODO: Create utility functions to avoid code duplication
		this.selectedDate = this.$route.query.date as string
		this.selectedAreas = Array.isArray(this.$route.query.areas)
			? this.$route.query.areas as string[]
			: [this.$route.query.areas]
		this.selectedSkys = Array.isArray(this.$route.query.skys)
			? this.$route.query.skys as string[]
			: [this.$route.query.skys]
		this.selectedTemperature.min = Number(this.$route.query.min)
		this.selectedTemperature.max = Number(this.$route.query.max)

		this.search()
	}

	async search() {
		try {
			const areas = await Promise.all(this.selectedAreas.map(area => SERVICES.getWeather(this.selectedDate, area)))

			areas.forEach(area => {
				const matches = getMatches(area, this.selectedTemperature.min, this.selectedTemperature.max, this.selectedSkys)
				console.log('MATCHES', matches)
				this.matchedLocations = [...this.matchedLocations, ...matches]
			})
		} catch (error) {
			console.log('ERROR', error)
		}
	}

	back() {
		// Use this instead of $route.back() to keep query params
		// TODO: Avoid duplication with BasePage
		this.$router.push({
			name: 'What', 
			query: this.$route.query,
			replace: true
		})
	}
}
</script>
