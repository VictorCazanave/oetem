<template>
  <div
    class="wrapper"
    aria-hidden="true"
  >
    <div
      v-for="i in 4"
      :key="i"
      :class="`cloud${i}`"
      class="cloud"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * Clouds animation
 * Based on:
 * - https://codepen.io/Mark_Bowley/pen/xEbuI
 * - https://codepen.io/alidz/pen/mVXdbz
 */
@Component
export default class MovingClouds extends Vue {}
</script>

<style lang="scss" scoped>
$color: #f1f1f1;
$shadow: 0 0 5rem 0.5rem $color;

// Use translate instead of position for better performance
@keyframes moveCloud {
  0% {
    transform: translateX(-20rem);
  }
  100% {
    transform: translateX(100vh);
  }
}

.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  overflow: hidden;
}

.cloud {
  position: absolute;
  z-index: 2;
  width: 11rem;
  height: 3.5rem;
  border-radius: 100rem;
  box-shadow: $shadow;
  background-color: $color;

  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    background: $color;
    box-shadow: $shadow;
    border-radius: 50%;
  }

  &:before {
    width: 6rem;
    height: 6rem;
    top: -3rem;
    right: 1.5rem;
  }

  &:after {
    width: 3rem;
    height: 3rem;
    top: -1.5rem;
    left: 1.5rem;
  }
}

// TODO: Improve animation
@for $i from 1 through 4 {
  .cloud#{$i} {
    top: ($i + 1) * 8rem;
    animation: moveCloud (5 - $i) * 10s linear infinite;
  }
}
</style>
