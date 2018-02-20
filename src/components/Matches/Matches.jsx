import React, {Component} from 'react';
import Summary from './Summary/Summary';
import Match from './Match/Match';
import './Matches.css';

class Matches extends Component {
	constructor() {
		super();
		this.state = {
			matches: []
		}

		this.handleClickSearch = this.handleClickSearch.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// Start search when display becomes true
		if (!this.props.display && nextProps.display) {
			this.handleClickSearch();
		}
	}

	handleClickSearch() {
		//TODO: Handle invalid data and display errors (missing date...)
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
			<section className="matches-page">
				<header className="matches-page__header">
					<h1 className="matches-page__header__title">Matches</h1>
					<blockquote className="matches-page__header__quote">
						<p className="matches-page__header__quote__text">
							&#34;Climate is what we expect, weather is what we get.&#34;
						</p>
						<span className="matches-page__header__quote__author">
							― Mark Twain
						</span>
					</blockquote>
				</header>
				{
					(this.state.matches.length === 0) && <div className="matches-page__empty">
							<p>Sorry, no place matched you criteria</p>
							<p>You may try again with less strict criteria</p>
						</div>
				}
				{
					(this.state.matches.length > 0) && <ul className="matches-page__list">{
								this.state.matches.map(
									(match) => (<li className="matches-page__list__item" key={match.name}><Match match={match}/></li>)
								)
							}</ul>
				}
			</section>
		);
	}
}

export default Matches;
