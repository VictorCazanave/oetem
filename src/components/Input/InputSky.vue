<template>
  <label class="wrapper">
    <input
      type="checkbox"
      :value="sky.id"
      :checked="checked"
      class="input"
      @change="change"
    />
    <SkyImage
      :sky="sky"
      class="label"
    ></SkyImage>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Sky from '@/models/Sky'
import SkyImage from '@/components/SkyImage.vue'

@Component({
	components: {
		SkyImage
	},
	model: {
		event: 'change',
	},
})
export default class InputSky extends Vue {
	@Prop({ required: true }) readonly sky!: Sky;
	@Prop({ required: true }) readonly value!: string[];

	get checked(): boolean {
		return this.value.includes(this.sky.id)
	}

	change(): void {
		const newValue = this.checked 
			? this.value.filter(skyId => skyId !== this.sky.id)
			: [...this.value, this.sky.id]

		this.$emit('change', newValue)
	}
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  width: 4rem;
  height: 4rem;

  // TODO: Move to WhatView?
  margin: 0.25rem;

  border-radius: 50%;
  box-shadow: $input-shadow;
}

.input {
  // Hide native input
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;

  &:focus,
  &:hover {
    + .label {
      // Fake outline with round corners
      box-shadow: $input-shadow-focus;
    }
  }

  &:checked + .label {
    border-color: $input-color-selected;
  }
}

.label {
  @include transition(box-shadow, border-color);

  display: block;
  width: 4rem;
  height: 4rem;
  padding: 0.8rem;
  border: 0.2rem solid $input-bg;
  border-radius: 50%;
  background-color: $input-bg;
  cursor: pointer;
  user-select: none;
}

@media (min-width: $breakpoint-medium) {
  .wrapper {
    width: 6rem;
    height: 6rem;
    margin: $margin-small;
  }

  .label {
    width: 6rem;
    height: 6rem;
    border-width: 0.25rem;
  }
}
</style>
