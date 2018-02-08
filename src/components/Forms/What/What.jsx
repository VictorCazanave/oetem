import React from 'react';
import FormPage from '../FormPage';
import TemperatureInput from './TemperatureInput';
import SkyInput from './SkyInput';

class What extends React.Component {

	//TODO: Keep it? It is more optimized but more risky
	shouldComponentUpdate() {
		// Should update only when getting init data, because after there is no more changes
		return (
			this.props.temperature.min === -100 || this.props.temperature.max === 100 || this.props.skys.length === 0
		);
	}

	render() {
		return (
			<FormPage
				title="What?"
				subtitle="Choose the kind of weather you desire"
				quote="There is no such thing as bad weather, only different kinds of good weather."
				author="John Ruskin"
				button="Let's search"
				onClick={this.props.onClickNext}>
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
			</FormPage>
		);
	}
}

export default What;
