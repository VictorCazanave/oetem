<template>
  <BasePage
    title="When?"
    quote="Every day brings new choices."
    author="Martha Beck"
    :subtitles="['Choose a date you can go out:']"
    submit-label="One more question"
    :valid="!!selectedDate"
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
import { getStoredDate, storeDate } from '@/utilities'
import BasePage from '@/components/Base/BasePage.vue'
import InputDate from '@/components/Input/InputDate.vue'

@Component({
	components: {
		BasePage,
		InputDate
	}
})
export default class WhenView extends Vue {
	selectedDate = getStoredDate()
	
	@State dates!: string[]

	save(): void {
		storeDate(this.selectedDate)
		this.$router.push({ name: 'Where' })
	}
}
</script>
