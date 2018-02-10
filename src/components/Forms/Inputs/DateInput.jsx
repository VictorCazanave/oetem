import React from 'react';
import {getFormattedDate} from './DateUtils.js';

class DateInput extends React.Component {

	constructor(props) {
		super(props);
		this.formattedDate = getFormattedDate(props.date);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onToggle(event.target.value);
	}

	render() {
		return (
			<div className="date-input">
				<input
					type="radio"
					name="date"
					value={this.props.date}
					onChange={this.handleChange}
					id={this.props.date}
					className="date-input__input"/>
				<label htmlFor={this.props.date} className="date-input__label">
					<div className="date-input__label__month">{this.formattedDate.month}</div>
					<div className="date-input__label__date">{this.formattedDate.date}</div>
					<div className="date-input__label__day">{this.formattedDate.day}</div>
				</label>
			</div>
		);
	}
}

export default DateInput;
