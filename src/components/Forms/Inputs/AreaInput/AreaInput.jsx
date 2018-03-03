import React from 'react';
import './AreaInput.css';

function AreaInput(props) {
	const id = `area-${props.area.id}`; // Used to link input and label

	return (
		<div className="area-input">
				<input
					type="checkbox"
					value={props.area.id}
					checked={props.selected}
					onChange={(event) => props.onToggle(props.area, event.target.checked)}
					id={id}
					className="area-input__input"/>
				<label htmlFor={id} className="area-input__label">
					<span className="area-input__label__text">
						{props.area.name}
					</span>
				</label>
			</div>

	);
}

export default AreaInput;
