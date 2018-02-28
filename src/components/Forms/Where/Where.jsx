import React from 'react';
import FormPage from 'components/Forms/FormPage/FormPage';
import AreaInput from 'components/Forms/Inputs/AreaInput/AreaInput';

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
			<form>
				{
					props.areas.map((area) => (
						<AreaInput
							area={area}
							selected={props.selectedAreas.findIndex(a => a.id === area.id) > -1}
							onToggle={props.onSelectArea}
							key={area.id}/>
					))
				}
			</form>
		</FormPage>
	);
}

export default Where;
