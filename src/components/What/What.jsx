import React from 'react';
import TemperatureInput from './TemperatureInput';
import SkyInput from './SkyInput';

class What extends React.Component {

	constructor() {
		super();
		this.handleChangeTemperature = this.handleChangeTemperature.bind(this);
		this.handleToggleSky = this.handleToggleSky.bind(this);
	}

	//TODO: Keep it? It is more optimized but more risky
	shouldComponentUpdate() {
		// Should update only when getting init data, because after there is no more changes
		return (
			this.props.temperature.min === -100 || this.props.temperature.max === 100 || this.props.skys.length === 0
		);
	}

	handleChangeTemperature(selectedTemperature) {
		this.props.onSelectTemperature(selectedTemperature);
	}

	handleToggleSky(selectedSky, isSelected) {
		this.props.onSelectSky(selectedSky, isSelected);
	}

	render() {
		return (
			<form>
				<h2>What?</h2>
				<div>
					<TemperatureInput
						min={this.props.temperature.min}
						max={this.props.temperature.max}
						onChange={this.handleChangeTemperature}/>
				</div>
				<div>
					{this.props.skys.map((sky) => (<SkyInput sky={sky} onToggle={this.handleToggleSky} key={sky.id}/>))}
				</div>

			</form>
		);
	}
}

export default What;
