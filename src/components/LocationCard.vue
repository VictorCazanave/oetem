<template>
  <div class="card">
    <div class="info">
      <div class="name">{{ location.name }}</div>
      <div class="criteria">
        {{ location.areaName }}
        <span class="separator">-</span>
        {{ location.weather.minTemperature.value }}°{{ location.weather.minTemperature.unit }}
        &nbsp;/&nbsp;
        {{ location.weather.maxTemperature.value }}°{{ location.weather.maxTemperature.unit }}
        <span class="separator">-</span>
        <SkyImage
          :sky="location.weather.sky"
          width="24"
          height="auto"
        ></SkyImage>
      </div>
    </div>
    <div class="links">
      <a
        :href="`https://www.cwb.gov.tw/V8/E/W/Town/Town.html?TID=${location.geocode}`"
        target="_blank"
        rel=”noopener”
        title="See weather forecast"
        class="icon-sphere link"
      ></a>
      <a
        :href="`https://www.google.com/maps?q=${location.lat},${location.lon}`"
        target="_blank"
        rel=”noopener”
        title="See map"
        class="icon-location link"
      ></a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Location from '@/models/Location'
import SkyImage from '@/components/SkyImage.vue'
import ButtonIcon from '@/components/Button/ButtonIcon.vue'

@Component({
	components: {
		SkyImage,
		ButtonIcon
	}
})
export default class LocationCard extends Vue {
  @Prop({ required: true }) readonly location!: Location;
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  padding: 0.8rem;
  border-radius: 0.3rem;
  background-color: $input-bg;
}

.info {
  flex: 1;
  padding-right: 0.2rem;
  text-align: left;
}

.name {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.criteria {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-style: italic;
}

.separator {
  margin: 0 0.25rem;
}

.links {
  flex: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.link {
  @include transition(color);

  color: $page-txt-light;
  font-size: 1.2rem;
  text-decoration: none;

  &:focus,
  &:hover {
    color: $page-txt-dark;
  }
}
</style>
