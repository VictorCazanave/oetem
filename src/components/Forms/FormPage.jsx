import React from 'react';

function FormPage(props) {

	return (
		<section className="form-page">
			<header className="form-page__header">
				<h1 className="form-page__header__title">{props.title}</h1>
				<p className="form-page__header__subtitle">{props.subtitle}</p>
				<blockquote className="form-page__header__quote">
					{props.quote}<br/>{props.author}
				</blockquote>
			</header>
			{props.children}
			<footer className="form-page__footer">
				<button className="form-page__footer__button" onClick={props.onClick}>{props.button}</button>
			</footer>
		</section>
	);
}

export default FormPage;
