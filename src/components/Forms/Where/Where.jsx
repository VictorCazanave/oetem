import React, {Component} from 'react';
import FormPage from '../FormPage/FormPage';
import AreaInput from '../Inputs/AreaInput/AreaInput';

function Where(props) {

	return (
		<FormPage
			title="Where?"
			subtitle="Choose one or more places to go:"
			quote="Wherever you go, no matter what the weather, always bring your own sunshine."
			author="Anthony J. D'Angelo"
			button="Last question"
			valid={props.selectedAreas.size > 0}
			nextPath={props.nextPath}>
			<form>
				{
					props.areas.map((area) => (
						<AreaInput
							area={area}
							selected={props.selectedAreas.has(area)}
							onToggle={props.onSelectArea}
							key={area.id}/>
					))
				}
			</form>
		</FormPage>
	);
}

export default Where;
