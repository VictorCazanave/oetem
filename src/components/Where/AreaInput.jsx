import React from 'react';

class AreaInput extends React.Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		this.props.onToggle(this.props.area, !this.props.selected);
	}

	render() {
		return (<label>{this.props.area.name}
			<input type="checkbox" name={this.props.area.name} checked={this.props.selected} onChange={this.handleChange}/>
		</label>);
	}
}

export default AreaInput;
