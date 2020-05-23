<template>
  <button
    type="button"
    :title="`Remove ${area.name}`"
    class="tag"
    @click="$emit('remove', area.id)"
  >
    {{ area.name }}
    <i
      aria-hidden="true"
      class="icon-close icon"
    ></i>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Area from '@/models/Area'

@Component
export default class AreaTag extends Vue {
  @Prop({ required: true }) readonly area!: Area;
}
</script>

<style scoped lang="scss">
.tag {
  margin: 0.4rem 0.2rem;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  box-shadow: $input-shadow;
  background-color: $input-bg;
  font-size: 0.9rem;

  &:focus,
  &:hover {
    .icon {
      color: inherit;
    }
  }
}

.icon {
  margin-left: 0.25rem;
  background-color: $input-bg;
  color: $page-txt-light;
  font-size: 0.5rem;
}

@media (min-width: $breakpoint-medium) {
  .tag {
    margin: 0.6rem 0.3rem;
    padding: 0.3rem 0.6rem;
    font-size: 1rem;
  }

  .icon {
    margin-left: $margin-small;
    font-size: 0.8rem;
  }
}
</style>
