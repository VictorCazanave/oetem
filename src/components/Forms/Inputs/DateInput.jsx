import React from 'react';

class DateInput extends React.Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onToggle(event.target.value);
	}

	render() {
		return (
			<label>{this.props.date}
				<input type="radio" name="date" value={this.props.date} onChange={this.handleChange}/>
			</label>
		);
	}
}

export default DateInput;
