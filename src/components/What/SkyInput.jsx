import React from 'react';

class SkyInput extends React.Component {

	constructor() {
		super();
		this.state = {
			checked: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({checked: event.target.checked});
		this.props.onToggle(this.props.sky, event.target.checked);
	}

	render() {
		return (
			<label><img
				src={`http://www.cwb.gov.tw/V7/symbol/weather/gif/day/${this.props.sky.id}.gif`}
				alt={this.props.sky.label}/>
				<input
					type="checkbox"
					name={this.props.sky.id}
					checked={this.state.checked}
					onChange={this.handleChange}/>
			</label>
		);
	}
}

export default SkyInput;
