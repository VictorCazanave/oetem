<template>
  <BasePage
    title="Where?"
    quote="Wherever you go, no matter what the weather, always bring your own sunshine."
    author="Anthony J. D'Angelo"
    submit-label="Last question"
    :is-valid="selectedAreas.length > 0"
    previous-route="When"
    @submit="save"
  >
    <label
      v-for="area in areas"
      :key="area.id"
    >
      <input
        v-model="selectedAreas"
        type="checkbox"
        :value="area.id"
      />
      {{ area.name }}
    </label>
  </BasePage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Area from '@/models/Area'
import BasePage from '@/components/BasePage.vue'

@Component({
	components: {
    BasePage
	}
})
export default class WhereView extends Vue {
	selectedAreas: string[] = []
	
	@State areas!: Area[]

	created() {
		if(this.$route.query.areas) {
			// After page refresh areas query param is a string when only 1 value
			this.selectedAreas = Array.isArray(this.$route.query.areas)
				? this.$route.query.areas as string[]
				: [this.$route.query.areas]
		}
	}

	save(): void {
		this.$router.push({ 
			name: 'What',
			query: { 
				...this.$route.query,
				areas: this.selectedAreas
			}
		})
	}
}
</script>
