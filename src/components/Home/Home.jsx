import React from 'react';

class Home extends React.Component {
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
					<p className="home-page__header__quote">Reversed meteo to find where is your desired weather</p>
				</header>
				<footer className="home-page__footer">
					<button className="home-page__footer__button-about" onClick={this.handleClickAbout}>About</button>
					<button className="home-page__footer__button-start" onClick={this.props.onClickNext}>Let's start!</button>
				</footer>
			</section>
		);
	}
}

export default Home;
