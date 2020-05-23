/**
 * Declare vue-svg-map module to prevent typescript error
 * Based on: 
 * - https://stackoverflow.com/a/58750175/9826498
 * - https://stackoverflow.com/a/57132744/9826498
 */
declare module '@svg-maps/taiwan.main' {
	interface Location {
		id: string;
		name: string;
		path: string;
	}

	const map: {
		label: string;
		viewBox: string;
		locations: Location[];
	}

	export default map
}
