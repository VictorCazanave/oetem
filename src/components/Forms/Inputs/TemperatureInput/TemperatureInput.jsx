import React from 'react';
import InputRange from 'react-input-range';
import './TemperatureInput.css';

function TemperatureInput(props) {

	return (
		<div className="input-temperature">
			<InputRange
				minValue={props.min}
				maxValue={props.max}
				formatLabel={value => `${value}°C`}
				value={props.value}
				onChange={(value) => props.onChange(value)}/>
		</div>
	);
}

export default TemperatureInput;
