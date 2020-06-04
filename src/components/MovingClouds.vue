<template>
  <div
    class="wrapper"
    aria-hidden="true"
  >
    <div
      v-for="i in 8"
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
 * TODO: Improve design and animation
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
    transform: translateX(-50vh);
  }
  100% {
    transform: translateX(150vh);
  }
}

.wrapper {
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 40rem;
}

.cloud {
  position: absolute;
  width: 5rem;
  height: 2rem;
  border-radius: 100rem;
  box-shadow: $shadow;
  background-color: $color;

  &:before,
  &:after {
    content: "";
    position: absolute;
    background: $color;
    box-shadow: $shadow;
    border-radius: 50%;
  }

  &:before {
    width: 2.5rem;
    height: 2.5rem;
    top: -1.25rem;
    right: 0.75rem;
  }

  &:after {
    width: 1.5rem;
    height: 1.5rem;
    top: -0.75rem;
    left: 0.75rem;
  }
}

@for $i from 1 through 4 {
  .cloud#{$i} {
    top: $i * 7rem;
    animation: moveCloud (5 - $i) * 10s linear infinite;
  }

  .cloud#{$i + 4} {
    top: $i * 5rem;
    animation: moveCloud (5 - $i) * 7s linear infinite;
  }
}
</style>
