import React from 'react';
import PropTypes from 'prop-types';
import './LinkIcon.css';

function LinkIcon(props) {
	return (
		<a href={props.url} target="_blank" rel="noopener noreferrer" className="link-icon">
			{props.children}
		</a>
	);
}

LinkIcon.propTypes = {
	url: PropTypes.string,
	children: PropTypes.node
};

export default LinkIcon;
