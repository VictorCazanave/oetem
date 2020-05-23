<template>
  <blockquote class="wrapper">
    <p class="quote">
      &#34;{{ quote }}&#34;
    </p>
    <footer class="author">
      ― {{ author }}
    </footer>
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
.wrapper {
  position: relative;
  padding-bottom: 1.2rem;
}

.quote {
  color: $page-txt-light;
  font-size: 1.5rem;
  font-style: italic;
}

.author {
  position: absolute;
  bottom: 0;
  left: 2rem;
  font-size: 0.8rem;
  font-style: normal;
}
</style>
