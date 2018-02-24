import React from 'react';
import FormPage from '../FormPage/FormPage';
import TemperatureInput from '../Inputs/TemperatureInput/TemperatureInput';
import SkyInput from '../Inputs/SkyInput/SkyInput';
import './What.css';

function What(props) {

	return (
		<FormPage
			title="What?"
			quote="There is no such thing as bad weather, only different kinds of good weather."
			author="John Ruskin"
			button="Let's search"
			valid={props.selectedSkys.size > 0}
			nextPath={props.nextPath}>
			<form className="what-form">
				<div className="what-form__block">
					<h2 className="what-form__block__title">Temperature</h2>
					<p className="what-form__block__subtitle">Choose the range of temperature you like:</p>
					<TemperatureInput
						min={props.temperature.min}
						max={props.temperature.max}
						value={props.selectedTemperature}
						onChange={props.onSelectTemperature}/>
				</div>
				<div className="what-form__block">
					<h2 className="what-form__block__title">Sky</h2>
					<p className="what-form__block__subtitle">Choose the kind of sky you like:</p>
					{
						props.skys.map((sky) => (
							<SkyInput
								sky={sky}
								selected={props.selectedSkys.has(sky)}
								onToggle={props.onSelectSky}
								key={sky.id}/>
						))
					}
				</div>
			</form>
		</FormPage>
	);
}

export default What;
