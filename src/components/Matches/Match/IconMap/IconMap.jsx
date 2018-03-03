import React from 'react';
import LinkIcon from 'components/Common/LinkIcon/LinkIcon';

function IconMap(props) {
	const url = `https://www.google.com/maps?q=${props.lat},${props.lon}`;
	const titleId = `map-title-${props.lat}-${props.lon}`;

	return (
		<LinkIcon url={url}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-labelledby={titleId}>
				<title id={titleId}>Map icon</title>
				<path d="M16 0C10.477 0 6 4.477 6 10c0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zm0 16a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/>
			</svg>
		</LinkIcon>
	);
}

export default IconMap;
