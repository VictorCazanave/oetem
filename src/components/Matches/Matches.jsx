import React from 'react';
import Match from './Match';

class Matches extends React.Component {
	constructor() {
		super();
		this.state = {
			matches: []
		}

		this.handleClickSearch = this.handleClickSearch.bind(this);
	}

	handleClickSearch() {
		for (const area of this.props.selected.areas) {
			const url = `/${this.props.selected.date}_${area.id}.json`;

			fetch(url).then((response) => {
				return response.json()
			}).then((json) => {
				this.searchMatches(json.area.locations, this.props.selected);
			}).catch((err) => {
				console.error(`parsing ${url} failed`, err)
			})
		}
	}

	searchMatches(locations, selected) {
		const matches = locations.filter(location => this.match(location.weather, selected));
		this.setState({matches: matches});
	}

	match(weather, selected) {
		return (weather.minTemperature.value >= selected.temperature.min) && (
			weather.maxTemperature.value <= selected.temperature.max
		) && (selected.skys.find(sky => sky.id === weather.sky.id));
	}

	render() {

		return (
			<section>
				<button onClick={this.handleClickSearch}>Let's search!</button>
				<h2>Matches</h2>
				{(this.state.matches.length > 0) && <ul>{this.state.matches.map((match) => (<li key={match.name}><Match match={match}/></li>))}</ul>}
			</section>
		);
	}
}

export default Matches;
