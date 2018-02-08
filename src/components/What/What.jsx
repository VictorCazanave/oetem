import React from 'react';
import TemperatureInput from './TemperatureInput';
import SkyInput from './SkyInput';

class What extends React.Component {

	constructor() {
		super();
	}

	//TODO: Keep it? It is more optimized but more risky
	shouldComponentUpdate() {
		// Should update only when getting init data, because after there is no more changes
		return (
			this.props.temperature.min === -100 || this.props.temperature.max === 100 || this.props.skys.length === 0
		);
	}

	render() {
		return (
			<section>
				<header>
					<h1>What?</h1>
					<p>Choose the kind of weather you desire</p>
				</header>
				<form>
					<div>
						<TemperatureInput
							min={this.props.temperature.min}
							max={this.props.temperature.max}
							onChange={this.props.onSelectTemperature}/>
					</div>
					<div>
						{
							this.props.skys.map(
								(sky) => (<div key={sky.id}><SkyInput sky={sky} onToggle={this.props.onSelectSky}/></div>)
							)
						}
					</div>
				</form>
				<footer>
					<button onClick={this.props.onClickNext}>Let's search</button>
				</footer>
			</section>
		);
	}
}

export default What;
