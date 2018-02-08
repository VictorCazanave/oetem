import React from 'react';

class Summary extends React.Component {

	render() {

		return (
			<aside>
				{(this.props.data.date !== null) && <div>{this.props.data.date}</div>}
				{(this.props.data.areas.length > 0) && <ul>{this.props.data.areas.map((area) => (<li key={area.id}>{area.name}</li>))}</ul>}
				{(this.props.data.skys.length > 0) && <ul>{this.props.data.skys.map((sky) => (<li key={sky.id}>{sky.label}</li>))}</ul>}
			</aside>
		);
	}
}

export default Summary;
