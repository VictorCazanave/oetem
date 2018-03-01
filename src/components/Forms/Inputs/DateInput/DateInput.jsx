import React from 'react';
import { formatDate } from 'utils/DateUtils.js';
import './DateInput.css';

function DateInput(props) {
	const id = `date-${props.date}`; // Used to link input and label
	const formattedDate = formatDate(props.date);

	return (
		<div className="date-input">
				<input
					type="radio"
					value={props.date}
					checked={props.selected}
					onChange={() => props.onToggle(props.date)}
					id={id}
					className="date-input__input"/>
				<label htmlFor={id} className="date-input__label">
					<div className="date-input__label__month">{formattedDate.month}</div>
					<div className="date-input__label__date">{formattedDate.date}</div>
					<div className="date-input__label__day">{formattedDate.day}</div>
				</label>
			</div>
	);
}

export default DateInput;
