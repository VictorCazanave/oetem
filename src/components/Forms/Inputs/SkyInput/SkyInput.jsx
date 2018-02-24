import React from 'react';
import './SkyInput.css';

function SkyInput(props) {
	const id = `sky${props.sky.id}`; // Used to link input and label

	return (
		<div className="sky-input">
				<input
					type="checkbox"
					value={props.sky.id}
					checked={props.selected}
					onChange={(event) => props.onToggle(props.sky, event.target.checked)}
					id={id}
					className="sky-input__input"/>
				<label htmlFor={id} className="sky-input__label">
					<img
						src={`http://www.cwb.gov.tw/V7/symbol/weather/gif/day/${props.sky.id}.gif`}
						alt={props.sky.label}
						title={props.sky.label}/>
				</label>
			</div>
	);
}

export default SkyInput;
