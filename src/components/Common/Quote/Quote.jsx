import React from 'react';
import PropTypes from 'prop-types';
import './Quote.css';

function Quote(props) {
	return (
		<blockquote className={`quote ${props.className}`}>
			<p className="quote__text">&#34;{props.quote}&#34;</p>
			<span className="quote__author">― {props.author}</span>
		</blockquote>
	);
}

Quote.propTypes = {
	className: PropTypes.string,
	quote: PropTypes.string,
	author: PropTypes.string
};

export default Quote;
