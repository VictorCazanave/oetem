import React from 'react';
import './Match.css';
import forecastImg from './forecast.png';
import mapImg from './map.png';

class Match extends React.Component {

	render() {
		const forecastUrl = `http://www.cwb.gov.tw/V7e/forecast/town368/town2.php?townid=${this.props.match.geocode}`;
		const mapUrl = `https://www.google.com/maps?q=${this.props.match.lat},${this.props.match.lon}`

		return (
			<div className="match">
				<div className="match__name">
					{this.props.match.name}
				</div>
				<a href={forecastUrl} target="_blank" className="match__link">
					<img src={forecastImg} alt="forecast" className="match__link__image"/>
				</a>
				<a href={mapUrl} target="_blank" className="match__link">
					<img src={mapImg} alt="map" className="match__link__image"/>
				</a>
			</div>
		);
	}
}

export default Match;
