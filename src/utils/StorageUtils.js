/**
 * Store date into sessionStorage
 * @param  {String} date Date to store
 */
export function storeDate(date) {
	sessionStorage.setItem('oetem.date', date);
}

/**
 * Store areas into sessionStorage
 * @param  {Array} areas List of areas to store
 */
export function storeAreas(areas) {
	sessionStorage.setItem('oetem.areas', JSON.stringify(areas));
}

/**
 * Store temperature into sessionStorage
 * @param  {Object} temperature Temperature to store
 */
export function storeTemperature(temperature) {
	sessionStorage.setItem('oetem.temperature', JSON.stringify(temperature));
}

/**
 * Store skys into sessionStorage
 * @param  {Array} skys List of skys to store
 */
export function storeSkys(skys) {
	sessionStorage.setItem('oetem.skys', JSON.stringify(skys));
}

/**
 * Clear sessionStorage
 * @param  {Object} initTemperature Initial temperature to store
 */
export function clearStorage(initTemperature) {
	sessionStorage.removeItem('oetem.date');
	sessionStorage.removeItem('oetem.areas');
	sessionStorage.removeItem('oetem.skys');
	sessionStorage.setItem('oetem.temperature', JSON.stringify(initTemperature)); // react-input-range does not accept null values
}

/**
 * Return all values from sessionStorage
 * @return {Object} All values from sessionStorage
 */
export function getStorage() {
	const areas = sessionStorage.getItem('oetem.areas');
	const skys = sessionStorage.getItem('oetem.skys');
	
	return {
		date: sessionStorage.getItem('oetem.date'),
		areas: areas === null ? [] : JSON.parse(areas),
		temperature: JSON.parse(sessionStorage.getItem('oetem.temperature')),
		skys: skys === null ? [] : JSON.parse(skys)
	};
}
