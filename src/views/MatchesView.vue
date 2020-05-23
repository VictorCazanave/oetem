<template>
  <main class="page matches-page">
    <ButtonIcon
      label="Previous page"
      icon="previous"
      class="page-previous"
      @click="back"
    ></ButtonIcon>

    <h1 class="page-title">
      Matches
    </h1>

    <BaseQuote
      quote="Climate is what we expect, weather is what we get."
      author="Mark Twain"
      class="page-quote"
    ></BaseQuote>

    <BaseLoading
      v-if="loading"
      message="Searching for the best locations"
    ></BaseLoading>

    <template v-else>
      <h2 class="page-subtitle">
        {{ subtitle }}
      </h2>

      <ul class="matches">
        <li
          v-for="location in matchedLocations"
          :key="location.geocode"
          class="match"
        >
          <LocationCard :location="location"></LocationCard>
        </li>
      </ul>
    </template>

    <ButtonText
      label="Try again"
      class="page-button"
      @click="restart"
    ></ButtonText>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SERVICES from '@/services'
import Location from '@/models/Location'
import Temperature from '@/models/Temperature'
import { getMatches } from '@/utilities'
import BaseQuote from '@/components/Base/BaseQuote.vue'
import BaseLoading from '@/components/Base/BaseLoading.vue'
import ButtonIcon from '@/components/Button/ButtonIcon.vue'
import ButtonText from '@/components/Button/ButtonText.vue'
import LocationCard from '@/components/LocationCard.vue'

@Component({
	components: { 
		BaseQuote,
		BaseLoading,
		ButtonIcon,
		ButtonText,
		LocationCard
	}
})
export default class MatchesView extends Vue {
	loading = true
	selectedDate = ''
	selectedAreas: string[] = []
	selectedSkys: string[] = []
	selectedTemperature: Temperature = { min: 0 , max: 0 }
	matchedLocations: Location[] = []

	get subtitle(): string {
		if(this.matchedLocations.length === 0) {
			return 'Sorry, no place matches your criteria.'
		} else if(this.matchedLocations.length === 1) {
			return 'Here is the perfect place for you:'
		}

		return  `${this.matchedLocations.length} places match your criteria:`
	}

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
				this.matchedLocations = [...this.matchedLocations, ...matches]
			})
		} catch (error) {
			console.log('ERROR', error)
		} finally {
			this.loading = false
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

	restart() {
		this.$router.push({ name: 'Home' })
	}
}
</script>

<style scoped lang="scss">
.matches-page {
  background: linear-gradient(to top, $page-bg-dark, $page-bg-light);
}

.matches {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  max-width: $page-max-width;
  margin-bottom: $margin-medium;
}

.match {
  margin: $margin-small 0;
  list-style: none;
}

@media (min-width: $breakpoint-medium) {
  .matches {
    align-self: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .match {
    width: 40%;
    margin: $margin-small;
  }
}

@media (min-width: $breakpoint-large) {
  .match {
    width: 30%;
    margin: $margin-small;
  }
}
</style>
