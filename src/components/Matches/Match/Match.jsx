import React from 'react';
import PropTypes from 'prop-types';
import IconMap from './IconMap/IconMap';
import IconForecast from './IconForecast/IconForecast';
import './Match.css';

function Match(props) {
	return (
		<div className="match">
			<div className="match__location">
				<div className="match__location__name">{props.match.name}</div>
				<ul className="match__location__criteria">
					<li className="match__location__criteria__item">{props.match.area.name}</li>
					<li className="match__location__criteria__item">
						{props.match.weather.minTemperature.value}°{props.match.weather.minTemperature.unit}
						&nbsp;/&nbsp;{props.match.weather.maxTemperature.value}°{props.match.weather.maxTemperature.unit}
					</li>
					<li className="match__location__criteria__item">
						<img
							src={`http://www.cwb.gov.tw/V7/symbol/weather/gif/day/${props.match.weather.sky.id}.gif`}
							alt={props.match.weather.sky.label}
							title={props.match.weather.sky.label}
							className="match__location__criteria__item__image"
						/>
					</li>
				</ul>
			</div>
			<div className="match__more">
				<IconMap lat={props.match.lat} lon={props.match.lon} />
				<IconForecast geocode={props.match.geocode} />
			</div>
		</div>
	);
}

Match.propTypes = {
	match: PropTypes.shape({
		name: PropTypes.string,
		area: PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string
		}),
		weather: PropTypes.shape({
			minTemperature: PropTypes.shape({
				value: PropTypes.number,
				unit: PropTypes.string
			}),
			maxTemperature: PropTypes.shape({
				value: PropTypes.number,
				unit: PropTypes.stirng
			}),
			sky: PropTypes.shape({
				id: PropTypes.string,
				label: PropTypes.string
			})
		}),
		lat: PropTypes.string,
		lon: PropTypes.string,
		geocode: PropTypes.string
	})
};

export default Match;
