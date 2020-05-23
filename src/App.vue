<template>
  <div id="app">
    <BaseLoading
      v-if="loading"
      message="Loading weather data"
      class="loading"
    ></BaseLoading>

    <transition
      v-else
      name="slide-up"
    >
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ActionMethod } from 'vuex'
import { Action } from 'vuex-class'
import BaseLoading from '@/components/Base/BaseLoading.vue'

@Component({
	components: {
		BaseLoading
	}
})
export default class HomeView extends Vue {
	loading = true

	// https://github.com/ktsn/vuex-class/issues/58
	@Action fetchAvailableData!: ActionMethod
	
	created() {
		this.init()
	}
	
	async init() {
		try {
			await this.fetchAvailableData()
		} catch (error) {
			console.log('ERROR', error)
		} finally {
			this.loading = false
		}
	}
}
</script>

<style scoped lang="scss">
.loading {
  margin: 40% auto 0;
}
</style>
