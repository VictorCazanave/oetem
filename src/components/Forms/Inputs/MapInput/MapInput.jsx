import React from 'react';
import config from './MapInputConfig.js';
import './MapInput.css';

function MapInput(props) {
	return (
		<svg className="map-input" xmlns="http://www.w3.org/2000/svg" viewBox="312 322 688 973" aria-labelledby="map-input-title">
			<title id="map-input-title">Taiwan map</title>
		{
			config.areas.map((area) => (
				<path
					className="map-input__area"
					id={area.cwbId}
					onClick={(event) => props.onSelect({id:area.cwbId, name:area.name}, event.target.dataset.selected === 'false')}
					data-selected={props.selectedAreas.findIndex(a => a.id === area.cwbId) > -1}
					name={area.name}
					d={area.path}
					key={area.id} />
			))
		}
	</svg>
	);
}

export default MapInput;
