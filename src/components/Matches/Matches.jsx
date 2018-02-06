import React from 'react';
import Match from './Match';

class Matches extends React.Component {

	render() {

		return (<section>
			<h2>Matches</h2>
			{(this.props.matches.length > 0) && <ul>{this.props.matches.map((match) => (<li key={match.name}><Match match={match}/></li>))}</ul>}
		</section>);
	}
}

export default Matches;
