<template>
  <main class="page home">
    <h1 class="title">
      oeteM | Meteo
    </h1>

    <p class="intro">
      Find where your favourite weather will be
    </p>

    <aside class="sidebar">
      <ButtonIcon
        label="About"
        icon="about"
        @click="$modal.show('about')"
      ></ButtonIcon>
    </aside>

    <!-- Use button instead of router link to disable it when error -->
    <ButtonText
      label="Start"
      type="button"
      class="page-button"
      @click="start"
    ></ButtonText>

    <AboutModal></AboutModal>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { clearStorage } from '@/utilities'
import ButtonIcon from '@/components/Button/ButtonIcon.vue'
import ButtonText from '@/components/Button/ButtonText.vue'
import AboutModal from '@/components/AboutModal.vue'

@Component({
	components: {
		ButtonIcon,
		ButtonText,
		AboutModal
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
.home {
  padding: 5rem 0 2rem; // No left/right padding because of moving clouds
  background: linear-gradient(to bottom, $page-bg-dark, $page-bg-light);
  color: $page-txt-lighter;
}

.title {
  margin-bottom: 6.5rem;
  font-size: 2.5rem;
}

.intro {
  margin-bottom: 2rem;
  padding: 0 1rem;
  font-size: 1.1rem;
}

.sidebar {
  margin: auto 0 2rem;
}

@media (min-width: $breakpoint-medium) {
  .page {
    padding-top: 10rem;
  }

  .title {
    margin-bottom: 10rem;
    font-size: 4rem;
  }

  .intro {
    font-size: 1.5rem;
  }
}
</style>
