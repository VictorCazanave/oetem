<template>
  <p class="error">
    <i
      class="icon-sad icon"
      aria-hidden="true"
    ></i>
    {{ error }}
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseError extends Vue {
  @Prop({ required: true }) readonly error!: string;
}
</script>

<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  color: $page-txt-error;
}

.icon {
  margin-bottom: $margin-small;
  font-size: 2rem;
}
</style>
