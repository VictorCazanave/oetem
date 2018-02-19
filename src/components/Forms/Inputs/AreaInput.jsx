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
		// Used to link input and label
		const id = `area${this.props.area.id}`;

		return (
			<div className="area-input">
				<input
					type="checkbox"
					value={this.props.area.id}
					checked={this.props.selected}
					onChange={this.handleChange}
					id={id}
					className="area-input__input"/>
				<label htmlFor={id} className="area-input__label">
					<div className="area-input__label__text">
						{this.props.area.name}
					</div>
				</label>
			</div>

		);
	}
}

export default AreaInput;
