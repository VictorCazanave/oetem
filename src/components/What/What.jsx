import React from 'react';
import TemperatureInput from './TemperatureInput';

class What extends React.Component {

	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(temperature) {
		this.props.onChangeTemperature(temperature);
	}

	render() {
		return (<form>
			<h2>What?</h2>
			<TemperatureInput value={this.props.temperature} onChange={this.handleChange}/>
		</form>);
	}
}

export default What;
