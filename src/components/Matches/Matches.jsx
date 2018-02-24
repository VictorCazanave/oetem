import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import update from 'immutability-helper';

import {getSortedAreas} from './../../Utils/AreaUtils';
//import Summary from './Summary/Summary';
import Match from './Match/Match';

import './Matches.css';

class Matches extends Component {
	constructor() {
		super();
		this.state = {
			matches: []
		}
	}

	componentDidMount() {
		// Convert this.props.selected.skys Set into Array to use find() method
		const selectedSkys = [...this.props.selected.skys];

		// TODO: Handle invalid data and display errors (missing date...) for (const selectedArea of
		// this.props.selected.areas) { const url = `/${this.props.selected.date}_${selectedArea.id}.json`;
		const url = '20180212_10005.json';

		fetch(url).then((response) => {
			return response.json()
		}).then((json) => {
			this.searchMatches(json.area, this.props.selected.temperature, selectedSkys);
		}).catch((err) => {
			console.error(`parsing ${url} failed`, err)
		})
		//}
	}

	searchMatches(area, selectedTemperature, selectedSkys) {
		const matchedLocations = area.locations.filter(
			location => this.match(location.weather, selectedTemperature, selectedSkys)
		).map(matchedLocation => {
			matchedLocation.area = {
				id: area.id,
				name: area.name
			}
			return matchedLocation;
		});

		if (matchedLocations.length > 0) {
			this.setState((prevState) => {
				return update(prevState, {
					matches: {
						$push: matchedLocations
					}
				});
			});
		}
	}

	match(weather, selectedTemperature, selectedSkys) {
		return true;
		/*
		return (weather.minTemperature.value >= selectedTemperature.min) && (
			weather.maxTemperature.value <= selectedTemperature.max
		) && (selectedSkys.find(sky => sky.id === weather.sky.id));
		*/
	}

	render() {
		const sortedMatches = getSortedAreas(this.state.matches);

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
					{(sortedMatches.length === 1) && <p className="matches-page__header__subtitle">Here is the perfect place for you:</p>}
					{
						(sortedMatches.length > 1) && <p className="matches-page__header__subtitle">
								{sortedMatches.length}&nbsp;places match your wishes:
							</p>
					}
				</header>

				{
					(sortedMatches.length === 0) && <div className="matches-page__empty">
							<p>Sorry, no place matches your wishes</p>
							<p>You may try again with more open wishes</p>
						</div>
				}
				{
					(sortedMatches.length > 0) && <ul className="matches-page__list">{
								sortedMatches.map(
									(match) => (<li className="matches-page__list__item" key={match.name}><Match match={match}/></li>)
								)
							}</ul>
				}

				<footer className="matches-page__footer">
					<Link to="/" className="matches-page__footer__button-home">Home</Link>
					<Link to={this.props.firstPath} className="matches-page__footer__button-again">Try again!</Link>
				</footer>
			</section>
		);
	}
}

export default Matches;
