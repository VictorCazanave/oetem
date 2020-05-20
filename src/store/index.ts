import Vue from 'vue'
import Vuex from 'vuex'
import SERVICES from '@/services'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		dates: [],
		areas: [],
		skys: [],
		temperature: {},
	},
	mutations: {
		setAvailableData(state, { dates, areas, skys, temperature }) {
			state.dates = dates
			state.areas = areas
			state.skys = skys
			state.temperature = temperature
		},
	},
	actions: {
		async fetchAvailableData({ commit }) {
			const data = await SERVICES.getAvailableData()

			commit('setAvailableData', data)
		}
	},
	modules: {
	}
})
