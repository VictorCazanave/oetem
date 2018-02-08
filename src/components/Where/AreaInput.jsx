import React from 'react';

class AreaInput extends React.Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onToggle(this.props.area, event.target.checked);
	}

	render() {
		return (
			<label>{this.props.area.name}
				<input type="checkbox" name={this.props.area.id} onChange={this.handleChange}/>
			</label>
		);
	}
}

export default AreaInput;
