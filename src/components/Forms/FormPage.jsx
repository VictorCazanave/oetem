import React from 'react';

function FormPage(props) {

	return (
		<section>
			<header>
				<h1>{props.title}</h1>
				<p>{props.subtitle}</p>
				<blockquote>
					{props.quote}<br/>{props.author}
				</blockquote>
			</header>
			{props.children}
			<footer>
				<button onClick={props.onClick}>{props.button}</button>
			</footer>
		</section>
	);
}

export default FormPage;
