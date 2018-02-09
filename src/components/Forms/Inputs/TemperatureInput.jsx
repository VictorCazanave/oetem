import React from 'react';
import InputRange from 'react-input-range';

class TemperatureInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: {
				min: props.min,
				max: props.max
			}
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// Set state when getting init data to avoid error from InputRange
		if (nextProps.min !== this.props.min || nextProps.max !== this.props.max) {
			this.setState({
				value: {
					min: nextProps.min,
					max: nextProps.max
				}
			});
		}
	}

	handleChange(value) {
		this.setState({value: value});
		this.props.onChange(value);
	}

	render() {
		return (
			<InputRange
				minValue={this.props.min}
				maxValue={this.props.max}
				formatLabel={value => `${value}°C`}
				value={this.state.value}
				onChange={this.handleChange}/>
		);
	}
}

export default TemperatureInput;
