import React from 'react';
import './LinkIcon.css';

function LinkIcon(props) {

	return (
		<a href={props.url} target="_blank" rel="noopener noreferrer" className="link-icon">
			{props.children}
		</a>
	);
}

export default LinkIcon;
