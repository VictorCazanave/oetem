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
			<section>
				<header>
					<h1>oeteM | Meteo</h1>
					<p>Reversed meteo to find where is your desired weather</p>
				</header>
				<footer>
					<button onClick={this.handleClickAbout}>About</button>
					<button onClick={this.props.onClickNext}>Let's start</button>
				</footer>
			</section>
		);
	}
}

export default Home;
