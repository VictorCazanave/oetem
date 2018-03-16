import React from 'react';
import FormPage from 'components/Forms/FormPage/FormPage';
import MapInput from 'components/Forms/Inputs/MapInput/MapInput';
import MapInputAreas from 'components/Forms/Inputs/MapInput/MapInputAreas';

function Where(props) {

	const extendedAreas = props.areas.map((area) => {
		const mapInputArea = MapInputAreas.find(a => a.name === area.name);

		// Replace MapInputArea id with CWB id
		return { ...mapInputArea, ...area };
	});

	const handleAreaClick = (event) => {
		const selectedArea = { id: event.target.id, name: event.target.attributes['aria-label'].value };
		const isSelected = event.target.attributes['aria-selected'].value === 'false'; // Because it is a string, not a boolean
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
			<MapInput
				areas={extendedAreas}
				onAreaClick={handleAreaClick}
				isAreaSelected={area => props.selectedAreas.findIndex(a => a.id === area.id) > -1} />
		</FormPage>
	);
}

export default Where;
