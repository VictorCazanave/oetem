import Vue from 'vue'
import VModal from 'vue-js-modal'
import 'reflect-metadata'

import '@/styles/main.scss'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VModal)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
