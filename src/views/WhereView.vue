<template>
  <BasePage
    title="Where?"
    quote="Wherever you go, no matter what the weather, always bring your own sunshine."
    author="Anthony J. D'Angelo"
    :subtitles="['Choose the places you want to go:']"
    submit-label="Last question"
    :valid="selectedAreaIds.length > 0"
    previous-route="When"
    @submit="save"
  >
    <template #section0>
      <CheckboxSvgMap
        v-model="selectedAreaIds"
        :map="taiwan"
        class="map"
      >
      </CheckboxSvgMap>

      <div class="group">
        <AreaTag
          v-for="id in selectedAreaIds"
          :key="id"
          :area="getArea(id)"
          @remove="removeArea"
        ></AreaTag>
      </div>
    </template>
  </BasePage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { CheckboxSvgMap } from 'vue-svg-map'
import Taiwan from '@svg-maps/taiwan.main'
import { AREA_ID } from '@/utilities'
import Area from '@/models/Area'
import BasePage from '@/components/Base/BasePage.vue'
import AreaTag from '@/components/AreaTag.vue'

@Component({
	components: {
		BasePage,
		CheckboxSvgMap,
		AreaTag,
	}
})
export default class WhereView extends Vue {
	taiwan = {
		...Taiwan,

		// Replace location ids by CWB ids
		locations: Taiwan.locations.map(location => ({...location, id: AREA_ID[location.id]}))
	}
	
	selectedAreaIds: string[] = []
	
	@State areas!: Area[]

	created() {
		if(this.$route.query.areas) {
			// After page refresh areas query param is a string when only 1 value
			this.selectedAreaIds = Array.isArray(this.$route.query.areas)
				? this.$route.query.areas as string[]
				: [this.$route.query.areas]
		}
	}

	getArea(id: string): Area|undefined {
		return this.areas.find(area => area.id === id)
	}

	removeArea(id: string): void {
		this.selectedAreaIds = this.selectedAreaIds.filter(selectedAreaId => selectedAreaId !== id)
	}

	save(): void {
		this.$router.push({ 
			name: 'What',
			query: { 
				...this.$route.query,
				areas: this.selectedAreaIds
			}
		})
	}
}
</script>

<style lang="scss" scoped>
.map {
  margin-bottom: 1rem;
}
</style>
