<template>
  <blockquote>
    <p>&#34;{{ quote }}&#34;</p>
    <footer>― {{ author }}</footer>
  </blockquote>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseQuote extends Vue {
  @Prop({ required: true }) readonly quote!: string;
  @Prop({ required: true }) readonly author!: string;
}
</script>

<style scoped lang="scss">
</style>
