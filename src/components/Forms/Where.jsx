import React, {Component} from 'react';
import FormPage from './FormPage';
import AreaInput from './Inputs/AreaInput';

class Where extends Component {

	//TODO: Keep it? Maybe more optimized but more risky
	/*
	shouldComponentUpdate(nextProps) {
		// Should update only when getting init data and selecting new area
		return (this.props.areas.length === 0 && nextProps.areas.length > 0) || (
			this.props.selectedAreas !== nextProps.selectedAreas
		);
	}
	*/

	render() {
		return (
			<FormPage
				title="Where?"
				subtitle="Choose one or more places to go:"
				quote="Wherever you go, no matter what the weather, always bring your own sunshine."
				author="Anthony J. D'Angelo"
				button="Last question"
				nextPath="/what">
				<form>
					{
						this.props.areas.map((area) => (
							<AreaInput
								area={area}
								selected={this.props.selectedAreas.has(area)}
								onToggle={this.props.onSelectArea}
								key={area.id}/>
						))
					}
				</form>
			</FormPage>
		);
	}
}

export default Where;
