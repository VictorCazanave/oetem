import React from 'react';
import AreaInput from './AreaInput';

class Where extends React.Component {

	constructor() {
		super();
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle(selectedArea, isSelected) {
		this.props.onSelectArea(selectedArea, isSelected);
	}

	render() {
		return (<form>
			<h2>Where?</h2>
			{this.props.areas.map((area) => (<AreaInput area={area} selected={this.props.selectedAreas.includes(area)} onToggle={this.handleToggle} key={area.id}></AreaInput>))}
		</form>);
	}
}

export default Where;
