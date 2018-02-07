import React from 'react';

class DateInput extends React.Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		this.props.onToggle(this.props.date);
	}

	render() {
		return (
			<label>{this.props.date}
				<input
					type="radio"
					name="date"
					value={this.props.date}
					checked={this.props.selected}
					onChange={this.handleChange}/>
			</label>
		);
	}
}

export default DateInput;
