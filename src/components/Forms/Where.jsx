import React from 'react';
import FormPage from './FormPage';
import AreaInput from './Inputs/AreaInput';

class Where extends React.Component {

	//TODO: Keep it? It is more optimized but more risky
	shouldComponentUpdate() {
		// Should update only when getting init data, because after there is no more changes
		return (this.props.areas.length === 0);
	}

	render() {
		return (
			<FormPage
				title="Where?"
				subtitle="Choose one or more places of your desired weather"
				quote="Wherever you go, no matter what the weather, always bring your own sunshine."
				author="Anthony J. D'Angelo"
				button="Last question"
				onClick={this.props.onClickNext}>
				<form>
					{
						this.props.areas.map((area) => (
							<div key={area.id}>
								<AreaInput area={area} onToggle={this.props.onSelectArea}></AreaInput>
							</div>
						))
					}
				</form>
			</FormPage>
		);
	}
}

export default Where;
