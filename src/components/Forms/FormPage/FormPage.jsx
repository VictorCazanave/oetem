import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Quote from 'components/Common/Quote/Quote';
import './FormPage.css';

function FormPage(props) {
	return (
		<section className="form-page">
			<header className="form-page__header">
				<h1 className="form-page__header__title">{props.title}</h1>
				<Quote quote={props.quote} author={props.author} className="form-page__header__quote" />
				{props.subtitle && <p className="form-page__header__subtitle">{props.subtitle}</p>}
			</header>
			{props.children}
			<footer className="form-page__footer">
				{props.valid ? (
					<Link to={props.nextPath} className="form-page__footer__button">
						{props.button}
					</Link>
				) : (
					<button disabled="disabled" className="form-page__footer__button--disabled">
						{props.button}
					</button>
				)}
			</footer>
		</section>
	);
}

FormPage.propTypes = {
	title: PropTypes.string,
	quote: PropTypes.string,
	author: PropTypes.string,
	subtitle: PropTypes.string,
	button: PropTypes.string,
	valid: PropTypes.bool,
	nextPath: PropTypes.string,
	children: PropTypes.node
};

export default FormPage;
