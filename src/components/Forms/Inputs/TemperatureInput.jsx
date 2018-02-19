import React, {Component} from 'react';
import InputRange from 'react-input-range';

class TemperatureInput extends Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value) {
		// Need to return temperature object
		this.props.onChange(value);
	}

	render() {
		return (
			<div className="input-temperature">
				<InputRange
					minValue={this.props.min}
					maxValue={this.props.max}
					formatLabel={value => `${value}°C`}
					value={this.props.value}
					onChange={this.handleChange}/>
			</div>
		);
	}
}

export default TemperatureInput;
