declare	interface Location {
	id: string;
	name: string;
	path: string;
}

declare	interface Map {
	label: string;
	viewBox: string;
	locations: Location[];
}

export = Map
