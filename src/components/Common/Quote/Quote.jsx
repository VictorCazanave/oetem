import React from 'react';
import './Quote.css';

function Quote(props) {

	return (
		<blockquote className={`quote ${props.className}`}>
			<p className="quote__text">&#34;{props.quote}&#34;</p>
			<span className="quote__author">― {props.author}</span>
		</blockquote>
	);
}

export default Quote;
