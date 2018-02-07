import React from 'react';

class AreaInput extends React.Component {

	constructor() {
		super();
		this.state = {
			checked: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({checked: event.target.checked});
		this.props.onToggle(this.props.area, event.target.checked);
	}

	render() {
		return (
			<label>{this.props.area.name}
				<input
					type="checkbox"
					name={this.props.area.id}
					checked={this.state.checked}
					onChange={this.handleChange}/>
			</label>
		);
	}
}

export default AreaInput;
