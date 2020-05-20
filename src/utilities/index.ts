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
