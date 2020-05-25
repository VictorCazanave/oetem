<template>
  <main class="page">
    <ButtonIcon
      label="Previous page"
      icon="previous"
      class="page-previous"
      @click="$router.back()"
    ></ButtonIcon>

    <h1 class="page-title">
      {{ title }}
    </h1>

    <BaseQuote
      :quote="quote"
      :author="author"
      class="page-quote"
    ></BaseQuote>

    <form
      @submit.prevent="$emit('submit')"
      class="form"
    >
      <section
        v-for="(subtitle, index) in subtitles"
        :key="index"
        class="section"
      >
        <h2
          :id="`subtitle${index}`"
          class="page-subtitle"
        >
          {{ subtitle }}
        </h2>
        <slot :name="`section${index}`"></slot>
      </section>

      <ButtonText
        :label="submitLabel"
        :disabled="!valid"
        class="page-button"
      ></ButtonText>
    </form>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BaseQuote from './BaseQuote.vue'
import ButtonIcon from '@/components/Button/ButtonIcon.vue'
import ButtonText from '@/components/Button/ButtonText.vue'

@Component({
	components: { 
		BaseQuote,
		ButtonIcon,
		ButtonText
	}
})
export default class BasePage extends Vue {
	@Prop({ required: true }) readonly title!: string;
	@Prop({ required: true }) readonly quote!: string;
  @Prop({ required: true }) readonly author!: string;
	@Prop({ required: true }) readonly subtitles!: string[];
  @Prop({ required: true }) readonly submitLabel!: string;
	@Prop({ required: true }) readonly valid!: boolean;
}
</script>

<style scoped lang="scss">
.form {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: $page-max-width;
  margin: 0 auto;
}

.section {
  margin-bottom: $margin-medium;
}

@media (min-width: $breakpoint-medium) {
  .section {
    margin-bottom: 4rem;
  }
}
</style>
