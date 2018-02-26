const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const _getDate = (string) => {
	const year = string.slice(0, 4);
	const month = string.slice(4, 6);
	const day = string.slice(6, 8);

	return new Date(year, month, day);
}

export function getFormattedDate(string) {
	const date = _getDate(string);

	return {
		year: date.getFullYear(),
		month: MONTHS[date.getMonth()],
		date: date.getDate(),
		day: DAYS[date.getDay()]
	};
}
