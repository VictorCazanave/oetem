import React from 'react';
import ReactModal from 'react-modal';
import './About.css'

function About(props) {
	// TODO: Find a better place to call it only once?
	ReactModal.setAppElement('#root');

	return (
		<ReactModal
			isOpen={props.show}
			onRequestClose={props.onClose}
			contentLabel="About oetem"
			closeTimeoutMS={300}
			className={{base:"about", afterOpen:"about--after-open", beforeClose:"about--before-close"}}
			overlayClassName={{base:"overlay", afterOpen:"overlay--after-open", beforeClose:"overlay--before-close"}}>
			<section>
				<header className="about__header">
					<h1 className="about__header__title">About</h1>
					<p>oeteM helps you to find where the weather you like will be.</p>
				</header>
				<div className="about__block">
					<h2 className="about__block__title">How to use it?</h2>
					<ol className="about__block__list">
						<li className="about__block__list__item">
							Choose a date you can go out to enjoy the weather
						</li>
						<li className="about__block__list__item">
							Choose areas you (would) like to go: <span className="about__block__list__item__example">Taipei City, Hsinchu County...</span>
						</li>
						<li className="about__block__list__item">
							Choose the weather you like: <span className="about__block__list__item__example">sunny, between 15° and 25°...</span>
						</li>
						<li className="about__block__list__item">
							Get a list of cities which match your criteria!
						</li>
					</ol>
				</div>
				<div className="about__block">
					<h2 className="about__block__title">Data</h2>
					<p className="about__block__text">
						All the data are provided by the <a href="http://www.cwb.gov.tw/" target="_blank" rel="noopener noreferrer">Taiwan Central Weather Bureau</a>.
					</p>
				</div>
				<button
					onClick={props.onClose}
					title="close"
					className="about__button-close"
					aria-label="Close">X</button>
				<footer className="about__footer">
					Created by <a href="https://linkedin.com/in/victorcazanave" target="_blank" rel="noopener noreferrer">Victor Cazanave</a>.
				</footer>
			</section>
		</ReactModal>
	);
}

export default About;
