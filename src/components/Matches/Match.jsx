import React from 'react';

class Match extends React.Component {

	render() {

		return (
			<div className="match">
				<div className="match__name">
					{this.props.match.name}
				</div>
				<a href="">Maps</a>
				<a href="">Weather forecast</a>
			</div>
		);
	}
}

export default Match;
