import update from 'immutability-helper';
import { get, set } from 'object-path';

/**
 * Return a new array sorted by given property
 * @param  {Array} 	array    	Array to copy and sort
 * @param  {String} property 	Name of property used to sort
 * @return {Array}          	New sorted array
 */
export function sortBy(array, property) {
	// Array.sort() does not return a copy
	let copy = [...array];

	return copy.sort((item1, item2) => {
		if (item1[property] < item2[property]) {
			return -1;
		}
		if (item1[property] > item2[property]) {
			return 1;
		}
		return 0;
	});
}

/**
 * Return a new object with updated value
 * @param  {Object} obj		Object to copy
 * @param  {String} path	Path of the property (ex: 'a.b.c')
 * @param  {Any} 		value	New value of the property
 * @return {Object}       New object with updated value
 */
 // TODO: Delete it and use updateValues instead?
export function updateValue(obj, path, value) {
	let objUpdate = {};
	set(objUpdate, `${path}.$set`, value);
	
	return update(obj, objUpdate);
}

/**
 * Return a new object with updated values
 * @param  {Object} obj			Object to copy
 * @param  {Object} config	Set of properties path / new value pairs (ex: {'a.b.c': false, 'd.e': 42})
 * @return {Object}       	New object with updated values
 */
export function updateValues(obj, config) {
	let objUpdate = {};
	
	for(let path in config) {
		set(objUpdate, `${path}.$set`, config[path]);
	}
	
	return update(obj, objUpdate);
}

/**
 * Return a new object with updated array
 * @param  {Object} 	obj		Object to copy
 * @param  {String} 	path	Path of the property (ex: 'a.b.c')
 * @param  {Any}			elem  Element to add/remove in the array
 * @param  {Boolean} 	added	Indicate whether element should be added or removed
 * @return {Object}					New object with updated array
 */
export function updateArray(obj, path, elem, added) {
	let objUpdate = {};
	let copy = [...get(obj, path)];

	if (added) {
		// Add element
		copy.push(elem);
	} else {
		// Remove element
		copy = copy.filter(e => e.id !== elem.id);
	}
	
	set(objUpdate, `${path}.$set`, copy);
	
	return update(obj, objUpdate);
}
