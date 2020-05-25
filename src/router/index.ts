import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
//import { hasDifferentQueryParams } from '@/utilities'
import HomeView from '@/views/HomeView.vue'
import WhenView from '@/views/WhenView.vue'
import WhereView from '@/views/WhereView.vue'
import WhatView from '@/views/WhatView.vue'
import MatchesView from '@/views/MatchesView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		component: HomeView
	},
	{
		path: '/when',
		name: 'When',
		component: WhenView
	},
	{
		path: '/where',
		name: 'Where',
		component: WhereView
	},
	{
		path: '/what',
		name: 'What',
		component: WhatView
	},
	{
		path: '/matches',
		name: 'Matches',
		component: MatchesView,
	}
]

const router = new VueRouter({
	routes
})

export default router
