import React, {Component} from 'react';
import {getFormattedDate} from './../../../../Utils/DateUtils.js';
import './DateInput.css';

class DateInput extends Component {

	constructor(props) {
		super(props);
		this.formattedDate = getFormattedDate(props.date);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onToggle(event.target.value);
	}

	render() {
		// Used to link input and label
		const id = `date${this.props.date}`;

		return (
			<div className="date-input">
				<input
					type="radio"
					value={this.props.date}
					checked={this.props.selected}
					onChange={this.handleChange}
					id={id}
					className="date-input__input"/>
				<label htmlFor={id} className="date-input__label">
					<div className="date-input__label__month">{this.formattedDate.month}</div>
					<div className="date-input__label__date">{this.formattedDate.date}</div>
					<div className="date-input__label__day">{this.formattedDate.day}</div>
				</label>
			</div>
		);
	}
}

export default DateInput;
