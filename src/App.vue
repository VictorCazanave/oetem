<template>
  <div id="app">
    <div v-if="loading">Loading...</div>
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ActionMethod } from 'vuex'
import { Action } from 'vuex-class'

@Component
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
