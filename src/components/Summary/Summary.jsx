import React from 'react';

class Summary extends React.Component {

	render() {

		return (<aside>
			<h1>Summary</h1>
			{(this.props.selected.date !== null) && <div>{this.props.selected.date}</div>}
			{(this.props.selected.areas.length > 0) && <ul>{this.props.selected.areas.map((area) => (<li key={area.id}>{area.name}</li>))}</ul>}
		</aside>);
	}
}

export default Summary;
