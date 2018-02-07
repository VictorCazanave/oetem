import React from 'react';

class SkyInput extends React.Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		this.props.onToggle(this.props.sky, !this.props.selected);
	}

	render() {
		return (<label><img src={`http://www.cwb.gov.tw/V7/symbol/weather/gif/day/${this.props.sky.id}.gif`} alt={this.props.sky.label}/>
			<input type="checkbox" name={this.props.sky.id} checked={this.props.selected} onChange={this.handleChange}/>
		</label>);
	}
}

export default SkyInput;
