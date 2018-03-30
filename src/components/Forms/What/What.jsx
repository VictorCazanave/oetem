import React from 'react';
import PropTypes from 'prop-types';
import FormPage from 'components/Forms/FormPage/FormPage';
import TemperatureInput from 'components/Forms/Inputs/TemperatureInput/TemperatureInput';
import SkyInput from 'components/Forms/Inputs/SkyInput/SkyInput';
import './What.css';

function What(props) {
	return (
		<FormPage
			title="What?"
			quote="There is no such thing as bad weather, only different kinds of good weather."
			author="John Ruskin"
			button="Search"
			valid={props.selectedSkys.length > 0}
			nextPath={props.nextPath}>
			<form className="what-form">
				<div className="what-form__block">
					<h2 className="what-form__block__title">Temperature</h2>
					<p className="what-form__block__subtitle">Choose the range of temperature you like:</p>
					<TemperatureInput
						min={props.temperature.min}
						max={props.temperature.max}
						value={props.selectedTemperature}
						onChange={props.onSelectTemperature}
					/>
				</div>
				<div className="what-form__block">
					<h2 className="what-form__block__title">Sky</h2>
					<p className="what-form__block__subtitle">Choose the kind of sky you like:</p>
					{props.skys.map(sky => (
						<SkyInput sky={sky} selected={props.selectedSkys.findIndex(s => s.id === sky.id) > -1} onToggle={props.onSelectSky} key={sky.id} />
					))}
				</div>
			</form>
		</FormPage>
	);
}

What.propTypes = {
	temperature: PropTypes.shape({
		min: PropTypes.number,
		max: PropTypes.number
	}),
	selectedTemperature: PropTypes.shape({
		min: PropTypes.number,
		max: PropTypes.number
	}),
	onSelectTemperature: PropTypes.func,
	skys: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string
		})
	),
	selectedSkys: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string
		})
	),
	onSelectSky: PropTypes.func,
	nextPath: PropTypes.string
};

export default What;
