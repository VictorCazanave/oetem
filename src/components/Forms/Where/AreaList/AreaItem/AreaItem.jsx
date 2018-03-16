import React from 'react';
import './AreaItem.css';

function AreaItem(props) {
	const label = `Deselect ${props.area.name}`;

	return (
		<li className="area-item">
			{props.area.name}
			<button
				onClick={() => props.onDeselect(props.area)}
				title={label}
				aria-label={label}
				className="area-item__button">
				X
			</button>
		</li>

	);
}

export default AreaItem;
