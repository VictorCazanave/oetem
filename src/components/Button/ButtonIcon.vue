<template>
  <button
    :aria-label="label"
    :title="label"
    :class="`icon-${icon} button`"
    v-on="$listeners"
  ></button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ButtonText extends Vue {
	@Prop({ required: true }) readonly label!: string;	
	@Prop({ required: true }) readonly icon!: string;	
}
</script>

<style scoped lang="scss">
// TODO: Remove code duplication with ButtonText
.button {
  @include transition(box-shadow);

  width: $button-secondary-size;
  height: $button-secondary-size;
  border-radius: 50%;
  box-shadow: $button-shadow;
  background-color: $button-secondary-bg;
  color: $button-secondary-txt;
  font-size: 1.2rem;

  &:focus,
  &:hover {
    box-shadow: $button-shadow-focus;
  }

  &:active {
    box-shadow: $button-shadow-active;
  }

  &:disabled {
    color: lighten($button-secondary-txt, 20);
    box-shadow: $button-shadow-disabled;
  }

  @media (min-width: $breakpoint-medium) {
    font-size: 1.4rem;
  }
}
</style>
