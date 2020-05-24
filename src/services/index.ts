import Area from '@/models/Area'

const BASE_URL = 'https://oetem.victorcazanave.com/'

export default {
	async getAvailableData(): Promise<object> {
		const res = await fetch(`${BASE_URL}init.json`)
		const data = await res.json()

		return data
	},

	async getWeather(date: string, areaId: string): Promise<Area> {
		const res = await fetch(`${BASE_URL}${date}_${areaId}.json`)
		const data = await res.json()

		return data.area
	}
}
