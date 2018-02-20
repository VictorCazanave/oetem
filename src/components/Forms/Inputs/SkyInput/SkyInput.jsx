import React, {Component} from 'react';
import './SkyInput.css';

class SkyInput extends Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		// Need to return sky object, not only sky.id (event.target.value)
		this.props.onToggle(this.props.sky, event.target.checked);
	}

	render() {
		// Used to link input and label
		const id = `sky${this.props.sky.id}`;

		return (
			<div className="sky-input">
				<input
					type="checkbox"
					value={this.props.sky.id}
					checked={this.props.selected}
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
