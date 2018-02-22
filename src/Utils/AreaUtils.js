export function getSortedAreas(areas) {
		return areas.sort((area1, area2) => {
			if (area1.name < area2.name) {
				return -1;
			}
			if (area1.name > area2.name) {
				return 1;
			}
			return 0;
	});
}