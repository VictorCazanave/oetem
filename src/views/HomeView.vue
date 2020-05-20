<template>
  <section>
    <h1>oeteM | Meteo</h1>
    <p>Find where your favourite weather will be</p>
    <RouterLink :to="{ name: 'When' }">
      Start
    </RouterLink>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeView extends Vue {
}
</script>
