import React from 'react';
import InputRange from 'react-input-range';
import PropTypes from 'prop-types';
import './TemperatureInput.css';

function TemperatureInput(props) {
	return (
		<div className="input-temperature">
			<InputRange
				minValue={props.min}
				maxValue={props.max}
				formatLabel={value => `${value}°C`}
				value={props.value}
				onChange={value => props.onChange(value)}
			/>
		</div>
	);
}

TemperatureInput.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	value: PropTypes.shape({
		min: PropTypes.number,
		max: PropTypes.number
	}),
	onChange: PropTypes.func
};

export default TemperatureInput;
