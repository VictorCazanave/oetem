import React from 'react';
import './Match.css';
import forecastImg from './forecast.png';
import mapImg from './map.png';

class Match extends React.Component {

	render() {
		const forecastUrl =
			`http://www.cwb.gov.tw/V7e/forecast/town368/town2.php?townid=${this.props.match.geocode}`;
		const mapUrl = `https://www.google.com/maps?q=${this.props.match.lat},${this.props.match.lon}`

		return (
			<div className="match">
				<div className="match__location">
					<div className="match__location__name">
						{this.props.match.name}
					</div>
					<ul className="match__location__criteria">
						<li className="match__location__criteria__item">
							{this.props.match.area.name}
						</li>
						<li className="match__location__criteria__item">
							{this.props.match.weather.minTemperature.value}°{this.props.match.weather.minTemperature.unit}
							&nbsp;/&nbsp;{this.props.match.weather.maxTemperature.value}°{this.props.match.weather.maxTemperature.unit}
						</li>
						<li className="match__location__criteria__item">
							<img
								src={`http://www.cwb.gov.tw/V7/symbol/weather/gif/day/${this.props.match.weather.sky.id}.gif`}
								alt={this.props.match.weather.sky.label}
								title={this.props.match.weather.sky.label}
								className="match__location__criteria__item__image"/>
						</li>
					</ul>
				</div>
				<div className="match__more">
					<a href={mapUrl} target="_blank" rel="noopener noreferrer" className="match__more__link">
						<img src={mapImg} alt="Map icon" className="match__more__link__image"/>
					</a>
					<a href={forecastUrl} target="_blank" rel="noopener noreferrer" className="match__more__link">
						<img src={forecastImg} alt="Forecast icon" className="match__more__link__image"/>
					</a>
				</div>
			</div>
		);
	}
}

export default Match;
