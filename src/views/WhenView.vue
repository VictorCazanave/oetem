<template>
  <BasePage
    title="When?"
    quote="Every day brings new choices."
    author="Martha Beck"
    :subtitles="['Choose a date you can go out:']"
    submit-label="One more question"
    :valid="!!selectedDate"
    previous-route="Home"
    @submit="save"
  >
    <template #section0>
      <div
        role="radiogroup"
        aria-labelledby="subtitle0"
        class="group"
      >
        <InputDate
          v-for="date in dates"
          :key="date"
          v-model="selectedDate"
          :date="date"
        ></InputDate>
      </div>
    </template>
  </BasePage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import BasePage from '@/components/Base/BasePage.vue'
import InputDate from '@/components/Input/InputDate.vue'

@Component({
	components: {
		BasePage,
		InputDate
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
