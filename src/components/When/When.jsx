import React from 'react';
import DateInput from './DateInput';

class When extends React.Component {

	constructor() {
		super();
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle(date) {
		this.props.onSelectDate(date);
	}

	render() {
		return (<form>
			<h2>When?</h2>
			{this.props.dates.map((date) => (<DateInput date={date} selected={date === this.props.selectedDate} onToggle={this.handleToggle} key={date}></DateInput>))}
		</form>);
	}
}

export default When;
