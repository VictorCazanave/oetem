<template>
  <main class="page matches-page">
    <ButtonIcon
      label="Previous page"
      icon="previous"
      class="page-previous"
      @click="$router.back()"
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
import { 
	getStoredDate,
	getStoredAreas,
	getStoredMinTemperature, 
	getStoredMaxTemperature,
	getStoredSkys,
	getMatches
} from '@/utilities'
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
	date = getStoredDate()
	areaIds = getStoredAreas()

	// TODO: Find a way to handle missing temperatures
	minTemperature= getStoredMinTemperature(-100)
	maxTemperature= getStoredMaxTemperature(100)

	skys = getStoredSkys()
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
		if(this.date 
			&& this.areaIds.length > 0 
			&& this.minTemperature !== undefined
			&& this.maxTemperature !== undefined
			&& this.skys.length > 0
		) {
			this.search()
		}
	}

	async search() {
		try {
			const areas = await Promise.all(this.areaIds.map(areaId => SERVICES.getWeather(this.date, areaId)))

			areas.forEach(area => {
				const matches = getMatches(area, this.minTemperature, this.maxTemperature, this.skys)
				this.matchedLocations = [...this.matchedLocations, ...matches]
			})
		} catch (error) {
			console.log('ERROR', error)
		} finally {
			this.loading = false
		}
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
