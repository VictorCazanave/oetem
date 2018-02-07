import React from 'react';
import DateInput from './DateInput';

class When extends React.Component {

	constructor() {
		super();
		this.handleToggle = this.handleToggle.bind(this);
	}

	//TODO: Keep it? It is more optimized but more risky
	shouldComponentUpdate() {
		// Should update only when getting init data, because after there is no more changes
		return (this.props.dates.length === 0);
	}

	handleToggle(selectedDate) {
		this.props.onSelectDate(selectedDate);
	}

	render() {
		return (
			<form>
				<h2>When?</h2>
				{
					this.props.dates.map(
						(date) => (<DateInput date={date} onToggle={this.handleToggle} key={date}></DateInput>)
					)
				}
			</form>
		);
	}
}

export default When;
