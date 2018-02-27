import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import { sortBy } from 'Utils/ImmutabilityUtils';
import Quote from 'components/Common/Quote/Quote';
import Spinner from 'components/Common/Spinner/Spinner';
import Match from 'components/Matches/Match/Match';
import './Matches.css';

class Matches extends Component {
	constructor() {
		super();
		this.state = {
			valid: false,
			fetching: true,
			matches: []
		}
	}

	componentDidMount() {
		const valid = this.checkSelected(this.props.selected);

		// Update state.valid
		this.setState((prevState) => {
			return update(prevState, {
				valid: {
					$set: valid
				}
			});
		});

		// Fetch data and search matches
		if (valid) {
			let requests = []
			const selectedSkys = [...this.props.selected.skys]; // Convert this.props.selected.skys Set into Array to use find() method

			for (const selectedArea of this.props.selected.areas) {
				const url = `/${this.props.selected.date}_${selectedArea.id}.json`;

				requests.push(fetch(url)
					.then(response => response.json())
					.catch(err => console.error(`parsing ${url} failed`, err))
				);
			}

			Promise.all(requests)
				.then((responses) => {
					let matches = [];

					for (const response of responses) {
						matches = matches.concat(
							this.getMatches(response.area, this.props.selected.temperature, selectedSkys)
						);
					}

					this.setState((prevState) => {
						return update(prevState, {
							fetching: {
								$set: false
							},
							matches: {
								$set: sortBy(matches, 'name')
							}
						});
					});
				})
		}
	}

	checkSelected(selected) {
		return typeof selected.date === 'string' &&
			selected.areas.size > 0 &&
			typeof selected.temperature.min === 'number' &&
			typeof selected.temperature.max === 'number' &&
			selected.skys.size > 0;
	}

	getMatches(area, selectedTemperature, selectedSkys) {
		return area.locations
			.filter(location => this.match(location.weather, selectedTemperature, selectedSkys))
			.map(matchedLocation => {
				matchedLocation.area = {
					id: area.id,
					name: area.name
				}
				return matchedLocation;
			});
	}

	match(weather, selectedTemperature, selectedSkys) {
		return (weather.minTemperature.value >= selectedTemperature.min) && (
			weather.maxTemperature.value <= selectedTemperature.max
		) && (selectedSkys.find(sky => sky.id === weather.sky.id));
	}

	render() {
		return (
			<section className="matches-page">
				<header className="matches-page__header">
					<h1 className="matches-page__header__title">Matches</h1>
					<Quote quote="Climate is what we expect, weather is what we get." author="Mark Twain" className="matches-page__header__quote"/>
					{
						(!this.state.valid) &&
						<p className="matches-page__header__subtitle">
							Hum... It seems that an error occured.
							<span className="matches-page__header__subtitle__smiley">:-(</span>
						 	Please try again!
						</p>
					}
					{
						(this.state.valid && this.state.fetching) &&
						<Spinner/>
					}
					{
						(this.state.valid && !this.state.fetching && this.state.matches.length === 0) &&
						<p className="matches-page__header__subtitle">
							Sorry, no place matches your criteria.
							<span className="matches-page__header__subtitle__smiley">:-/</span>
							Please try again later or with less strict criteria!
						</p>
					}
					{
						(this.state.valid && !this.state.fetching && this.state.matches.length === 1) &&
						<p className="matches-page__header__subtitle">
							Here is the perfect place for you:
						</p>
					}
					{
						(this.state.valid && !this.state.fetching && this.state.matches.length > 1) &&
						<p className="matches-page__header__subtitle">
							{this.state.matches.length}&nbsp;places match your criteria:
						</p>
					}
				</header>

				<ul className="matches-page__list">
					{
						(this.state.valid && !this.state.fetching) &&
						this.state.matches.map((match) => (<li className="matches-page__list__item" key={`${match.area.id}${match.name}`}><Match match={match}/></li>))
					}
				</ul>

				<footer className="matches-page__footer">
					<Link to="/" className="matches-page__footer__button-home">Home</Link>
					<Link to={this.props.againPath} onClick={this.props.onClickAgain} className="matches-page__footer__button-again">Try again</Link>
				</footer>
			</section>
		);
	}
}

export default Matches;
