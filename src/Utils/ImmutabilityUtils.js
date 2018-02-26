import update from 'immutability-helper';

export function updateValue(obj, parent, property, value) {
	return update(obj, {
		[parent]: {
			[property]: {
				$set: value
			}
		}
	});
}

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
