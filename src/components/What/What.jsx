import React from 'react';
import TemperatureInput from './TemperatureInput';
import SkyInput from './SkyInput';

class What extends React.Component {

	constructor() {
		super();
		this.handleChangeTemperature = this.handleChangeTemperature.bind(this);
		this.handleToggleSky = this.handleToggleSky.bind(this);
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
						value={this.props.selectedTemperature}
						onChange={this.handleChangeTemperature}/>
				</div>
				<div>
					{
						this.props.skys.map((sky) => (
							<SkyInput
								sky={sky}
								selected={this.props.selectedSkys.includes(sky)}
								onToggle={this.handleToggleSky}
								key={sky.id}/>
						))
					}
				</div>

			</form>
		);
	}
}

export default What;
