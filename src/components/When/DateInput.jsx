import React from 'react';

class DateInput extends React.Component {

	constructor() {
		super();
		this.state = {
			checked: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({checked: event.target.checked});
		this.props.onToggle(this.props.date);
	}

	render() {
		return (
			<label>{this.props.date}
				<input
					type="radio"
					name="date"
					value={this.props.date}
					checked={this.state.checked}
					onChange={this.handleChange}/>
			</label>
		);
	}
}

export default DateInput;
