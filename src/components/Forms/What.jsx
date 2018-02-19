import React from 'react';
import FormPage from './FormPage';
import TemperatureInput from './Inputs/TemperatureInput';
import SkyInput from './Inputs/SkyInput';

class What extends React.Component {

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
				nextPath="/matches">
				<form className="what-form">
					<div className="what-form__block">
						<h2 className="what-form__block__title">Temperature</h2>
						<p className="what-form__block__subtitle">Choose the range of temperature you would like:</p>
						<TemperatureInput
							min={this.props.temperature.min}
							max={this.props.temperature.max}
							value={this.props.selectedTemperature}
							onChange={this.props.onSelectTemperature}/>
					</div>
					<div className="what-form__block">
						<h2 className="what-form__block__title">Sky</h2>
						<p className="what-form__block__subtitle">Choose the kind of sky you would like:</p>
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
