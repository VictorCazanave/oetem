import React from 'react';
import InputRange from 'react-input-range';

class TemperatureInput extends React.Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value) {
		this.props.onChange(value);
	}

	render() {
		return (
			<InputRange
				minValue={this.props.min}
				maxValue={this.props.max}
				formatLabel={value => `${value}°C`}
				value={this.props.value}
				onChange={this.handleChange}/>
		);
	}
}

export default TemperatureInput;
