<template>
  <BasePage
    title="When?"
    quote="Every day brings new choices."
    author="Martha Beck"
    submit-label="One more question"
    :is-valid="!!selectedDate"
    previous-route="Home"
    @submit="save"
  >
    <div
      role="radiogroup"
      aria-labelledby="page-title"
    >
      <label
        v-for="date in dates"
        :key="date"
      >
        <input
          v-model="selectedDate"
          type="radio"
          :value="date"
        />
        {{ date }}
      </label>
    </div>
  </BasePage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import BasePage from '@/components/BasePage.vue'

@Component({
	components: {
    BasePage
	}
})
export default class WhenView extends Vue {
	selectedDate = ''
	
	@State dates!: string[]

	created() {
		if(this.$route.query.date) {
			// Type based on: https://github.com/vuejs/vue-router/pull/2050#issuecomment-441797165
			this.selectedDate = this.$route.query.date as string
		}
	}

	save(): void {
		this.$router.push({ 
			name: 'Where', 
			query: { 
				// To keep all query params
				...this.$route.query,
				date: this.selectedDate
			} 
		})
	}
}
</script>
