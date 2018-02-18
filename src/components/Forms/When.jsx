import React from 'react';
import FormPage from './FormPage';
import DateInput from './Inputs/DateInput';

class When extends React.Component {

	//TODO: Keep it? It is more optimized but more risky
	shouldComponentUpdate() {
		// Should update only when getting init data, because after there is no more changes
		return (this.props.dates.length === 0);
	}

	render() {
		return (
			<FormPage
				title="When?"
				subtitle="Choose one date you can go out:"
				quote="Every day brings new choices."
				author="Martha Beck"
				button="One more question"
				nextPath="/where">
				<form>
					{
						this.props.dates.map(
							(date) => (<DateInput date={date} onToggle={this.props.onSelectDate} key={date}/>)
						)
					}
				</form>
			</FormPage>
		);
	}
}

export default When;
