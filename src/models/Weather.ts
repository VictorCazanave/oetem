import Sky from './Sky'

// Weather in matches
export default interface Weather {
	maxTemperature: { value: number, unit: string }
	minTemperature: { value: number, unit: string }
	sky: Sky
}
