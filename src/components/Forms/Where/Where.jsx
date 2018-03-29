import React from 'react';
import { SVGMap, Taiwan } from 'react-svg-map';
import FormPage from 'components/Forms/FormPage/FormPage';
import AreaList from './AreaList/AreaList';
import './Where.css';

function Where(props) {

	// SVGMap locations == oeteM areas
	// TODO: Standardize name (location VS area)
	const customTaiwan = {
		...Taiwan,
		locations: props.areas.map((area) => {
			// Display only available areas
			const location = Taiwan.locations.find(location => location.name === area.name);

			// Replace SVGMap location id with CWB id and return a copy of location object
			return { ...location, ...area };
		})
	};

	const handleAreaClick = (event) => {
		const selectedArea = { id: event.target.id, name: event.target.attributes.name.value };
		const isSelected = event.target.attributes['aria-checked'].value === 'false'; // Because it is a string, not a boolean
		props.onSelectArea(selectedArea, isSelected);
		event.target.blur(); // Remove focus on clicked element
	}

	return (
		<FormPage
			title="Where?"
			subtitle="Choose one or more places to go:"
			quote="Wherever you go, no matter what the weather, always bring your own sunshine."
			author="Anthony J. D'Angelo"
			button="Last question"
			valid={props.selectedAreas.length > 0}
			nextPath={props.nextPath}>

			<SVGMap
				map={customTaiwan}
				type="checkbox"
				onLocationClick={handleAreaClick}
				isLocationSelected={location => props.selectedAreas.findIndex(area => area.id === location.id) > -1} />

			<AreaList
				areas={props.selectedAreas}
				onDeselectArea={area => props.onSelectArea(area, false)}/>

		</FormPage>
	);
}

export default Where;
