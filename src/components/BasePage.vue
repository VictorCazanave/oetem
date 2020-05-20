<template>
  <section>
    <h1 id="page-title">
      {{ title }}
    </h1>

    <nav>
      <button @click="back">
        Previous
      </button>
    </nav>

    <BaseQuote
      :quote="quote"
      :author="author"
    ></BaseQuote>

    <form @submit.prevent="$emit('submit')">
      <slot></slot>

      <button
        type="submit"
        :disabled="!isValid"
      >
        {{ submitLabel }}
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BaseQuote from './BaseQuote.vue'

@Component({
	components: { BaseQuote }
})
export default class BasePage extends Vue {
	@Prop({ required: true }) readonly title!: string;
	@Prop({ required: true }) readonly quote!: string;
  @Prop({ required: true }) readonly author!: string;
  @Prop({ required: true }) readonly submitLabel!: string;
	@Prop({ required: true }) readonly isValid!: boolean;
	@Prop({ required: true }) readonly previousRoute!: string;
	
	back() {
		// Use this instead of $route.back() to keep query params
		this.$router.push({
			name: this.previousRoute, 
			query: this.$route.query,
			replace: true
		})
	}
}
</script>

<style scoped lang="scss">
</style>
