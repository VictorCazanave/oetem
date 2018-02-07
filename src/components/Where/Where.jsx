import React from 'react';
import AreaInput from './AreaInput';

class Where extends React.Component {

	constructor() {
		super();
		this.handleToggle = this.handleToggle.bind(this);
	}

	//TODO: Keep it? It is more optimized but more risky
	shouldComponentUpdate() {
		// Should update only when getting init data, because after there is no more changes
		return (this.props.areas.length === 0);
	}

	handleToggle(selectedArea, isSelected) {
		this.props.onSelectArea(selectedArea, isSelected);
	}

	render() {
		return (
			<form>
				<h2>Where?</h2>
				{
					this.props.areas.map(
						(area) => (<AreaInput area={area} onToggle={this.handleToggle} key={area.id}></AreaInput>)
					)
				}
			</form>
		);
	}
}

export default Where;
