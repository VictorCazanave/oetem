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
		const id = `area${this.props.area.id}`;

		return (
			<div className="area-input">
				<input
					type="checkbox"
					name={this.props.area.id}
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
