import update from 'immutability-helper';

/**
 * Return a new array sorted by given property
 * @param  {Array} 	array    	Array to copy and sort
 * @param  {String} property 	Name of property used to sort
 * @return {Array}          	New sorted array
 */
export function sortBy(array, property) {
	// sort() does not return a copy
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
 * @param  {Object} obj      Object to copy
 * @param  {String} parent   Name of the parent property ('selected')
 * @param  {String} property Name of the property to update
 * @param  {Any} 		value    New value of the property
 * @return {Object}          New object with updated value
 */
export function updateValue(obj, parent, property, value) {
	return update(obj, {
		[parent]: {
			[property]: {
				$set: value
			}
		}
	});
}

/**
 * Return a new object with updated set
 * @param  {Object} 	obj      Object to copy
 * @param  {String} 	parent   Name of the parent property ('selected')
 * @param  {String} 	property Name of the property to update
 * @param  {Ant} 			item     New item to add/remove in the set
 * @param  {Boolean} 	added    Indicate whether item should be added or removed
 * @return {Object}          	 New object with updated set
 */
export function updateSet(obj, parent, property, item, added) {
	let set = new Set([...obj[parent][property]]);

	if (added) {
		// Add item
		set.add(item);
	} else {
		// Remove item
		set.delete(item);
	}

	return update(obj, {
		[parent]: {
			[property]: {
				$set: set
			}
		}
	});
}
