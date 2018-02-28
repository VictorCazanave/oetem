export function storeDate(date) {
	sessionStorage.setItem('oetem.date', date);
}

export function storeAreas(areas) {
	sessionStorage.setItem('oetem.areas', JSON.stringify(areas));
}

export function storeTemperature(temperature) {
	sessionStorage.setItem('oetem.temperature', JSON.stringify(temperature));
}

export function storeSkys(skys) {
	sessionStorage.setItem('oetem.skys', JSON.stringify(skys));
}

export function clearStorage(initTemperature) {
	sessionStorage.removeItem('oetem.date');
	sessionStorage.removeItem('oetem.areas');
	sessionStorage.removeItem('oetem.skys');
	sessionStorage.setItem('oetem.temperature', JSON.stringify(initTemperature));
}

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
