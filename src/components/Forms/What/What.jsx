import React, {Component} from 'react';
import FormPage from '../FormPage/FormPage';
import TemperatureInput from '../Inputs/TemperatureInput/TemperatureInput';
import SkyInput from '../Inputs/SkyInput/SkyInput';
import './What.css';

class What extends Component {

	//TODO: Keep it? Maybe more optimized but more risky
	/*
	shouldComponentUpdate() {
		// Should update only when getting init data, because after there is no more changes
		return (
			this.props.temperature.min === -100 || this.props.temperature.max === 100 || this.props.skys.length === 0
		);
	}
	*/

	render() {
		return (
			<FormPage
				title="What?"
				quote="There is no such thing as bad weather, only different kinds of good weather."
				author="John Ruskin"
				button="Let's search"
				valid={this.props.selectedSkys.size > 0}
				nextPath="/matches">
				<form className="what-form">
					<div className="what-form__block">
						<h2 className="what-form__block__title">Temperature</h2>
						<p className="what-form__block__subtitle">Choose the range of temperature you like:</p>
						<TemperatureInput
							min={this.props.temperature.min}
							max={this.props.temperature.max}
							value={this.props.selectedTemperature}
							onChange={this.props.onSelectTemperature}/>
					</div>
					<div className="what-form__block">
						<h2 className="what-form__block__title">Sky</h2>
						<p className="what-form__block__subtitle">Choose the kind of sky you like:</p>
						{
							this.props.skys.map((sky) => (
								<SkyInput
									sky={sky}
									selected={this.props.selectedSkys.has(sky)}
									onToggle={this.props.onSelectSky}
									key={sky.id}/>
							))
						}
					</div>
				</form>
			</FormPage>
		);
	}
}

export default What;
