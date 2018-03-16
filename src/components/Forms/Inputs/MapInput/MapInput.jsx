import React from 'react';
import MapInputAreas from './MapInputAreas';
import './MapInput.css';

function MapInput(props) {
	const areas = props.areas || MapInputAreas;
	const role = props.role || 'button';

	return (
		<svg className="map-input" xmlns="http://www.w3.org/2000/svg" viewBox="312 322 688 973" aria-label="Map of Taiwan">
		{
			areas.map(area =>
				(<path
					className="map-input__area"
					id={area.id}
					d={area.path}
					onClick={props.onAreaClick}
					role={role}
					aria-label={area.name}
					aria-selected={props.isAreaSelected(area)}
					tabIndex="0"
					key={area.id} />
				)
			)
		}
	</svg>
	);
}

export default MapInput;
