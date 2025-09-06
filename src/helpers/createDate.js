export function getCarsDate () {
	const date = new Date();
	let numDate = date.getDate().toString();
	let numMonth = (date.getMonth() + 1).toString();
	const year = date.getFullYear();

	if (numDate.length < 2) {
		numDate = `${0}${numDate}`;
	}

	if (numMonth.length < 2) {
		numMonth = `${0}${numMonth}`;
	}

	return `${numDate}:${numMonth}:${year}`;
	
}