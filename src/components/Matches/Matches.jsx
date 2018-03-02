import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updateValue, sortBy } from 'utils/ImmutabilityUtils';
import { makeCancelable } from 'utils/PromiseUtils';
import Quote from 'components/Common/Quote/Quote';
import Spinner from 'components/Common/Spinner/Spinner';
import Match from 'components/Matches/Match/Match';
import './Matches.css';

class Matches extends Component {
	constructor() {
		super();

		this.state = {
			matches: []
		};

		// Not in state to avoid re-render when changing
		// because it would briefly display the error message when refreshing or clicking try again
		this.valid = true;
		this.fetching = true;

		this.cancelablePromise = null;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selected !== this.props.selected) {
			this.searchMatches(nextProps.selected);
		}
	}

	componentDidMount() {
		this.searchMatches(this.props.selected);
	}

	componentWillUnmount() {
		if (this.cancelablePromise !== null) {
			this.cancelablePromise.cancel();
		}
	}

	/**
	 * Fetch data, search matches and set state
	 * @param  {Object} selected Selected inputs
	 */
	searchMatches(selected) {
		this.valid = this.isValid(selected);

		if (this.valid) {
			let requests = [];

			// Fetch data
			for (const selectedArea of selected.areas) {
				const url = `/${selected.date}_${selectedArea.id}.json`;

				requests.push(fetch(url)
					.then(response => response.json())
					.catch(err => console.error(`parsing ${url} failed`, err))
				);
			}

			// Create a cancelable promise to avoid error in componentWillUnmount()
			this.cancelablePromise = makeCancelable(Promise.all(requests));

			this.cancelablePromise
				.promise
				.then((responses) => {
					let matches = [];

					// Search matches
					for (const response of responses) {
						matches = matches.concat(
							this.getMatches(response.area, selected.temperature, selected.skys)
						);
					}

					// Set state
					this.fetching = false;
					this.setState(prevState => updateValue(prevState, 'matches', sortBy(matches, 'name')));
				})
				.catch((error) => {
					// Do not throw error when promise is canceled
					// https://www.npmjs.com/package/makecancelable
					if (error && !error.isCanceled) {
						throw (error);
					}
				});
		} else {

		}
	}

	/**
	 * Check if selected inputs are valid
	 * @param  {Object} 	selected 	Selected inputs
	 * @return {Boolean}						Indicate whether selected inputs are valid or not
	 */
	// TODO: Find a better name
	isValid(selected) {
		return typeof selected.date === 'string' &&
			selected.areas.length > 0 &&
			typeof selected.temperature.min === 'number' &&
			typeof selected.temperature.max === 'number' &&
			selected.skys.length > 0;
	}

	/**
	 * Return a list of matched locations of a given area
	 * @param  {Object} area                Area where to look for matched locations
	 * @param  {Object} selectedTemperature Selected temperature (min/max)
	 * @param  {Array} selectedSkys        	List of selected skys
	 * @return {Array}                     	List of matched locations
	 */
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

	/**
	 * Check if location weather matches with selected weather
	 * @param  {Object} weather             Location weather
	 * @param  {Object} selectedTemperature Selected temperature (min/max)
	 * @param  {Array} selectedSkys        	List of selected skys
	 * @return {Boolean}                    Indicate whether data match or not
	 */
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
						(!this.valid) &&
						<p className="matches-page__header__subtitle">
							Hum... It seems that an error occured.
							<span className="matches-page__header__subtitle__smiley">:-(</span>
						 	Please try again!
						</p>
					}
					{
						(this.valid && this.fetching) &&
						<Spinner/>
					}
					{
						(this.valid && !this.fetching && this.state.matches.length === 0) &&
						<p className="matches-page__header__subtitle">
							Sorry, no place matches your criteria.
							<span className="matches-page__header__subtitle__smiley">:-/</span>
							Please try again later or with different criteria!
						</p>
					}
					{
						(this.valid && !this.fetching && this.state.matches.length === 1) &&
						<p className="matches-page__header__subtitle">
							Here is the perfect place for you:
						</p>
					}
					{
						(this.valid && !this.fetching && this.state.matches.length > 1) &&
						<p className="matches-page__header__subtitle">
							{this.state.matches.length}&nbsp;places match your criteria:
						</p>
					}
				</header>

				<ul className="matches-page__list">
					{
						(this.valid && !this.fetching) &&
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
