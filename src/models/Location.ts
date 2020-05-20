import Weather from './Weather'

// Location in search and matches
// TODO: Create MatchedLocation with only displayed properties (e.g. maxTemperatureLabel...)?
export default interface Location {
	name: string,
	geocode: string,
	lat: string,
	lon: string,
	areaName: string,
	weather: Weather
}
