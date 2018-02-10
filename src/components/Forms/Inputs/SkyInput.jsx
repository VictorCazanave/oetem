import React from 'react';

class SkyInput extends React.Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onToggle(this.props.sky, event.target.checked);
	}

	render() {
		const id = `sky${this.props.sky.id}`;

		return (
			<div className="sky-input">
				<input
					type="checkbox"
					name={this.props.sky.id}
					onChange={this.handleChange}
					id={id}
					className="sky-input__input"/>
				<label htmlFor={id} className="sky-input__label">
					<img
						src={`http://www.cwb.gov.tw/V7/symbol/weather/gif/day/${this.props.sky.id}.gif`}
						alt={this.props.sky.label}/>
				</label>
			</div>
		);
	}
}

export default SkyInput;
