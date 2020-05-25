<template>
  <img
    :src="`https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${sky.id}.svg`"
    :alt="sky.label"
    :title="sky.label"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Sky from '@/models/Sky'

@Component
export default class InputSky extends Vue {
	@Prop({ required: true }) readonly sky!: Sky;
}
</script>
