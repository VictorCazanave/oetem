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
			overlayClassName="overlay">
			<section>
				<header className="about__header">
					<h1 className="about__header__title">About</h1>
					<p>oeteM helps you to find where the weather you like will be.</p>
				</header>
				<article className="about__article">
					<h1 className="about__article__title">How to use it?</h1>
					<ol className="about__article__list">
						<li className="about__article__list__item">
							Choose a date you can go out to enjoy the weather
						</li>
						<li className="about__article__list__item">
							Choose areas you (would) like to go: <span className="about__article__list__item__example">Taipei City, Hsinchu County...</span>
						</li>
						<li className="about__article__list__item">
							Choose the weather you like: <span className="about__article__list__item__example">sunny, between 15° and 25°...</span>
						</li>
						<li className="about__article__list__item">
							Get a list of cities which match your criteria!
						</li>
					</ol>
				</article>
				<article className="about__article">
					<h1 className="about__article__title">Data</h1>
					<p className="about__article__text">
						All the data are provided by the <a href="http://www.cwb.gov.tw/" target="_blank" rel="noopener noreferrer">Taiwan Central Weather Bureau</a>.
					</p>
				</article>
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
