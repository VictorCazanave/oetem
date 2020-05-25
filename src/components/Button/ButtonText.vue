<template>
  <button
    class="button"
    v-on="$listeners"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonText extends Vue {
	@Prop({ required: true }) readonly label!: string;	
}
</script>

<style scoped lang="scss">
.button {
  @include transition(box-shadow);

  width: 60%;
  padding: 0.6rem 1.2rem;
  border-radius: 1000rem;
  box-shadow: $button-shadow;
  background-color: $button-primary-bg;
  color: $button-primary-txt;

  &:focus,
  &:hover {
    box-shadow: $button-shadow-focus;
  }

  &:active {
    box-shadow: $button-shadow-active;
  }

  &:disabled {
    background-color: lighten($button-primary-bg, 20);
    box-shadow: $button-shadow-disabled;
  }

  @media (min-width: $breakpoint-medium) {
    width: 16rem;
    font-size: 1.3rem;
  }
}
</style>
