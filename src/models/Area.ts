import Location from './Location'

// Area in form and matches
export default interface Area {
	id: string
	name: string
	locations?: Location[] // Only in matches
}
