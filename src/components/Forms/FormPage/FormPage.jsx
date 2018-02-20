import React from 'react';
import {Link} from 'react-router-dom';
import './FormPage.css';

function FormPage(props) {

	return (
		<section className="form-page">
			<header className="form-page__header">
				<h1 className="form-page__header__title">{props.title}</h1>
				<blockquote className="form-page__header__quote">
					<p className="form-page__header__quote__text">&#34;{props.quote}&#34;</p>
					<span className="form-page__header__quote__author">― {props.author}</span>
				</blockquote>
				{props.subtitle && <p className="form-page__header__subtitle">{props.subtitle}</p>}
			</header>
			{props.children}
			<footer className="form-page__footer">
				<Link to={props.nextPath} className="form-page__footer__button">{props.button}</Link>
			</footer>
		</section>
	);
}

export default FormPage;
