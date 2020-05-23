<template>
  <div class="loading">
    <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
    <svg
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      class="svg"
    >
      <g
        fill="none"
        fill-rule="evenodd"
      >
        <g
          transform="translate(1 1)"
          stroke-width="2"
        >
          <circle
            stroke-opacity=".5"
            cx="18"
            cy="18"
            r="18"
          />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
    <span>{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LoadingSpinner extends Vue {
		@Prop({ default: '' }) readonly message!: string;
}
</script>

<style scoped lang="scss">
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.svg {
  width: 4rem;
  height: 4rem;
  margin-bottom: $margin-medium;
  stroke: $page-txt-dark;
}
</style>
