import React from 'react';

class Match extends React.Component {

	render() {

		return (<div>
			{this.props.match.name}
			<a href="">Maps</a>
			<a href="">Weather forecast</a>
		</div>);
	}
}

export default Match;
