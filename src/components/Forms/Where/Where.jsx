import React from 'react';
import FormPage from 'components/Forms/FormPage/FormPage';
import MapInput from 'components/Forms/Inputs/MapInput/MapInput';

function Where(props) {
	return (
		<FormPage
			title="Where?"
			subtitle="Choose one or more places to go:"
			quote="Wherever you go, no matter what the weather, always bring your own sunshine."
			author="Anthony J. D'Angelo"
			button="Last question"
			valid={props.selectedAreas.length > 0}
			nextPath={props.nextPath}>
			<MapInput selectedAreas={props.selectedAreas} onSelect={props.onSelectArea}/>
		</FormPage>
	);
}

export default Where;
