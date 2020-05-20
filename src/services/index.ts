import Area from '@/models/Area'

const BASE_URL = 'https://oetem.victorcazanave.com/'

export default {
	async getAvailableData(): Promise<object> {
		const res = await fetch(`${BASE_URL}init.json`)
		const data = await res.json()
		console.log('AVAILABLE DATA', data)

		return data
	},

	async getWeather(date: string, area: string): Promise<Area> {
		const res = await fetch(`${BASE_URL}${date}_${area}.json`)
		const data = await res.json()
		console.log('WEATHER', data)

		// TODO: Really need date property?
		return data.area
	}
}
