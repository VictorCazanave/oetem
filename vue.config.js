module.exports = {
	// https://cli.vuejs.org/guide/deployment.html#github-pages
	publicPath: process.env.NODE_ENV === 'production' ? '/oetem/' : '/',

	css: {
		loaderOptions: {
			sass: {
				prependData: '@import "@/styles/_variables.scss"; @import "@/styles/_mixins.scss";'
			}
		}
	},
}
