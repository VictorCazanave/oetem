import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Home extends Component {
	constructor() {
		super();
		this.handleClickAbout = this.handleClickAbout.bind(this);
	}

	handleClickAbout(event) {
		event.preventDefault();
		alert('todo!');
	}

	render() {

		return (
			<section className="home-page">
				<header className="home-page__header">
					<h1 className="home-page__header__title">oeteM | Meteo</h1>
				</header>
				<p className="home-page__intro">Reversed meteo to find where is your desired weather</p>
				<footer className="home-page__footer">
					<button className="button home-page__footer__button-about" onClick={this.handleClickAbout}>About</button>
					<Link to="/when" className="button home-page__footer__button-start">Let's start!</Link>
				</footer>
			</section>
		);
	}
}

export default Home;
