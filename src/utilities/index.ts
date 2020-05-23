import Area from '@/models/Area'
import Location from '@/models/Location'
import Weather from '@/models/Weather'

function match(weather: Weather, selectedMinTemperature: number, selectedMaxTemperature: number, selectedSkys: string[]): boolean {
	return weather.minTemperature.value >= selectedMinTemperature
		&& weather.maxTemperature.value <= selectedMaxTemperature
		&& selectedSkys.includes(weather.sky.id)
}

export function getMatches(area: Area, selectedMinTemperature: number, selectedMaxTemperature: number, selectedSkys: string[]): Location[] {
	return area.locations
		? area.locations.filter(location => match(location.weather, selectedMinTemperature, selectedMaxTemperature, selectedSkys))
			.map(location => ({
				// Keep only displayed properties
				...location,
				areaName: area.name,
				weather: {
					maxTemperature: location.weather.maxTemperature,
					minTemperature: location.weather.minTemperature,
					sky: location.weather.sky
				}
			}))
		: []
}

export function hasDifferentQueryParams(fromQuery = {}, toQuery = {}): boolean {
	const fromQueryParams = Object.keys(fromQuery)
	const toQueryParams = Object.keys(toQuery)

	return fromQueryParams.some(param => !toQueryParams.includes(param))
}

// Links between ids of svg-maps and ids of CWB
export const AREA_ID: { [key: string]: string } = {
	'changhua-county': '10007',
	'chiayi-city': '10020',
	'chiayi-county': '10010',
	'hualien-county': '10015',
	'hsinchu-city': '10018',
	'hsinchu-county': '10004',
	'kaohsiung-city': '64',
	'keelung-city': '10017',
	'miaoli-county': '10005',
	'nantou-county': '10008',
	'new-taipei-city': '65',
	'penghu-county': '10016',
	'pingtung-county': '10013',
	'taichung-city': '66',
	'tainan-city': '67',
	'taipei-city': '63',
	'taitung-county': '10014',
	'taoyuan-city': '68',
	'yilan-county': '10002',
	'yunlin-county': '10009'
}
