import React, {
	Component
} from 'react';
import {
	Link
} from 'react-router-dom';
import About from './About/About';
import './Home.css';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			showAbout: false
		}

		this.handleOpenAbout = this.handleOpenAbout.bind(this);
		this.handleCloseAbout = this.handleCloseAbout.bind(this);
	}

	handleOpenAbout(event) {
		event.preventDefault();
		this.setState({
			showAbout: true
		});
	}

	handleCloseAbout(event) {
		event.preventDefault();
		this.setState({
			showAbout: false
		});
	}

	render() {
		return (
			<section className="home-page">
				<header className="home-page__header">
					<h1 className="home-page__header__title">oeteM | Meteo</h1>
				</header>
				<p className="home-page__intro">Reversed meteo to find where is your wished weather</p>
				<footer className="home-page__footer">
					<button className="home-page__footer__button-about" onClick={this.handleOpenAbout}>About</button>
					<Link to="/when" className="home-page__footer__button-start">Let's start!</Link>
				</footer>
				<About show={this.state.showAbout} onClose={this.handleCloseAbout}/>
			</section>
		);
	}
}

export default Home;
