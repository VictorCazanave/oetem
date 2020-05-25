<template>
  <div id="app">
    <BaseLoading
      v-if="loading"
      message="Loading weather data"
      class="center"
    ></BaseLoading>

    <BaseError
      v-else-if="error"
      :error="error"
      class="center"
    ></BaseError>

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
import BaseError from '@/components/Base/BaseError.vue'

@Component({
	components: {
		BaseLoading,
		BaseError
	}
})
export default class HomeView extends Vue {
	loading = true
	error = ''

	// https://github.com/ktsn/vuex-class/issues/58
	@Action fetchAvailableData!: ActionMethod
	
	created() {
		this.init()
	}
	
	async init() {
		try {
			await this.fetchAvailableData()
		} catch (error) {
			this.error = 'Sorry, an error occurred. Please refresh the page or try again later.'
		} finally {
			this.loading = false
		}
	}
}
</script>

<style scoped lang="scss">
.center {
  margin: 40% auto 0;
}
</style>
