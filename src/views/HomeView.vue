<template>
  <main class="page">
    <h1 class="title">
      oeteM | Meteo
    </h1>

    <p class="intro">
      Find where your favourite weather will be
    </p>

    <!-- Use button instead of router link to disable it when error -->
    <ButtonText
      label="Start"
      type="button"
      class="page-button"
      @click="start"
    ></ButtonText>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { clearStorage } from '@/utilities'
import ButtonText from '@/components/Button/ButtonText.vue'

@Component({
	components: {
		ButtonText
	}
})
export default class HomeView extends Vue {
	start() {
		clearStorage()
		this.$router.push({ name: 'When' })
	}
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 5rem 0 2rem; // No left/right padding because of moving clouds
  background: linear-gradient(to bottom, $page-bg-dark, $page-bg-light);
  color: $page-txt-lighter;
}

.title {
  margin-bottom: 6.5rem;
  font-size: 2.5rem;
}

.intro {
  padding: 0 1rem;
  font-size: 1.1rem;
}

@media (min-width: $breakpoint-medium) {
  .title {
    margin-bottom: 10rem;
    font-size: 4rem;
  }

  .intro {
    font-size: 1.5rem;
  }
}
</style>
