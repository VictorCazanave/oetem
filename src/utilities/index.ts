import Area from '@/models/Area'
import Location from '@/models/Location'
import Weather from '@/models/Weather'

const STORAGE_KEY = {
	DATE: 'oetem.date',
	AREAS: 'oetem.areas',
	MIN_TEMPERATURE: 'oetem.minTemperature',
	MAX_TEMPERATURE: 'oetem.maxTemperature',
	SKYS: 'oetem.skys',
}

/**
 * Store selected date into session storage
 * 
 * @param date - Date to store
 */
export function storeDate(date: string): void {
	sessionStorage.setItem(STORAGE_KEY.DATE, date)
}

/**
 * Store selected areas ids into session storage
 *
 * @param areaIds - Ids of areas to store
 */
export function storeAreas(areaIds: string[]): void {
	sessionStorage.setItem(STORAGE_KEY.AREAS, JSON.stringify(areaIds))
}

/**
 * Store selected minimum temperature into session storage
 *
 * @param temperature - Temperature to store
 */
export function storeMinTemperature(temperature: number) {
	sessionStorage.setItem(STORAGE_KEY.MIN_TEMPERATURE, temperature.toString())
}

/**
 * Store selected maximum temperature into session storage
 *
 * @param temperature - Temperature to store
 */
export function storeMaxTemperature(temperature: number) {
	sessionStorage.setItem(STORAGE_KEY.MAX_TEMPERATURE, temperature.toString())
}

/**
 * Store selected skys ids into session storage
 *
 * @param skyIds - Ids of skys to store
 */
export function storeSkys(skyIds: string[]) {
	sessionStorage.setItem(STORAGE_KEY.SKYS, JSON.stringify(skyIds))
}

/**
 * Get stored selected date
 */
export function getStoredDate(): string {
	return sessionStorage.getItem(STORAGE_KEY.DATE) || ''
}

/**
 * Get stored selected areas ids
 */
export function getStoredAreas(): string[] {
	const areaIds = sessionStorage.getItem(STORAGE_KEY.AREAS)

	return areaIds === null ? [] : JSON.parse(areaIds)
}

/**
 * Get stored selected minimum temperature
 * 
 * @param defaultTemperature - Default value when no stored temperature
 */
export function getStoredMinTemperature(defaultTemperature: number): number {
	const minTemperature = sessionStorage.getItem(STORAGE_KEY.MIN_TEMPERATURE)

	return minTemperature === null ? defaultTemperature : Number(minTemperature)
}

/**
 * Get stored selected maximum temperature
 * 
 * @param defaultTemperature - Default value when no stored temperature
 */
export function getStoredMaxTemperature(defaultTemperature: number): number {
	const maxTemperature = sessionStorage.getItem(STORAGE_KEY.MAX_TEMPERATURE)

	return maxTemperature === null ? defaultTemperature : Number(maxTemperature)
}

/**
 * Get stored selected skys ids
 */
export function getStoredSkys(): string[] {
	const skyIds = sessionStorage.getItem(STORAGE_KEY.SKYS)

	return skyIds === null ? [] : JSON.parse(skyIds)
}

/**
 * Clear all data in session storage
 */
export function clearStorage(): void {
	Object.values(STORAGE_KEY).forEach(storageKey => {
		sessionStorage.removeItem(storageKey)
	})
}

/**
 * Links between ids of svg-maps and ids of CWB
 */
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

/**
 * Indicate whether a location weather matches user criteria
 * @private
 * 
 * @param weather - Weather of location
 * @param selectedMinTemperature - Mininum temperature to match 
 * @param selectedMaxTemperature - Maximum temperature to match
 * @param selectedSkys - Kinds of skys to match
 */
function match(weather: Weather, selectedMinTemperature: number, selectedMaxTemperature: number, selectedSkys: string[]): boolean {
	return weather.minTemperature.value >= selectedMinTemperature
		&& weather.maxTemperature.value <= selectedMaxTemperature
		&& selectedSkys.includes(weather.sky.id)
}

/**
 * Get all locations of area that match user criteria
 * 
 * @param area - Area to search in
 * @param selectedMinTemperature - Mininum temperature to match
 * @param selectedMaxTemperature - Maximum temperature to match
 * @param selectedSkys - Kinds of skys to match
 */
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
