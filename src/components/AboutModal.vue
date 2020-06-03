<template>
  <modal
    name="about"
    :adaptive="true"
    width="50%"
    :min-width="320"
    :max-width="800"
    height="auto"
  >
    <section class="about">
      <ButtonIcon
        label="Close"
        icon="close"
        class="close"
        @click="$modal.hide('about')"
      ></ButtonIcon>

      <h1 class="title">About eoteM</h1>
      <p>
        oeteM (reverse of "Meteo") is a reverse weather forecast application which helps you to find where the weather you like will be.
      </p>

      <h2 class="subtitle">How to use it?</h2>
      <ol>
        <li>Choose a date you can go out to enjoy the weather.</li>
        <li>
          Choose places you want to go:
          <span class="example">Taipei City, Hsinchu County...</span>
        </li>
        <li>
          Choose the weather you like:
          <span class="example">sunny, between 15° and 25°...</span>
        </li>
        <li>Tada! Get a list of cities that match your criteria.</li>
      </ol>

      <h2 class="subtitle">Data</h2>
      <p class="block__text">
        All the data are provided by the
        <a
          href="http://www.cwb.gov.tw/"
          target="_blank"
          rel="noopener"
          class="block__text__link"
        >
          Taiwan Central Weather Bureau</a>.
      </p>

      <footer class="footer">
        eoteM v2 created by Victor Cazanave
      </footer>
    </section>
  </modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ButtonIcon from '@/components/Button/ButtonIcon.vue'

@Component({
	components: {
		ButtonIcon,
	}
})
export default class AboutModal extends Vue {
}
</script>

<style scoped lang="scss">
.about {
  position: relative;
  height: 100%;
  padding: 2rem 2rem 4rem;
  background-color: $page-bg-light;
  color: $page-txt-dark;
  text-align: left;
}

.close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.title {
  margin-bottom: 2rem;
  font-size: 1.8rem;
  text-align: center;
}

.subtitle {
  margin: 2rem 0 1rem;
  font-size: 1.6rem;
}

.example {
  font-style: italic;
}

.footer {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  font-size: 0.7rem;
}

@media (min-width: $breakpoint-medium) {
  .about {
    padding: 3rem 3rem 5rem;
  }

  .title {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-align: center;
  }

  .subtitle {
    margin: 2rem 0 1rem;
    font-size: 1.8rem;
  }

  .footer {
    font-size: 0.8rem;
  }
}
</style>
