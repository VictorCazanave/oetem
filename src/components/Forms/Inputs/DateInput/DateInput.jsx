import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'utils/DateUtils.js';
import './DateInput.css';

function DateInput(props) {
	const id = `date-${props.date}`; // Used to link input and label
	const formattedDate = formatDate(props.date);

	return (
		// Keyboard interaction is normal: https://www.w3.org/wiki/RadioButton
		<div className="date-input">
			<input
				type="radio"
				value={props.date}
				checked={props.selected}
				onChange={() => props.onToggle(props.date)}
				id={id}
				className="date-input__input"
			/>
			<label htmlFor={id} className="date-input__label">
				<span className="date-input__label__month">{formattedDate.month}</span>
				<span className="date-input__label__date">{formattedDate.date}</span>
				<span className="date-input__label__day">{formattedDate.day}</span>
			</label>
		</div>
	);
}

DateInput.propTypes = {
	date: PropTypes.string,
	selected: PropTypes.bool,
	onToggle: PropTypes.func
};

export default DateInput;
