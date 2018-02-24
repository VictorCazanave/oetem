import React, {Component} from 'react';
import FormPage from '../FormPage/FormPage';
import DateInput from '../Inputs/DateInput/DateInput';

class When extends Component {

	//TODO: Keep it? It is more optimized but more risky
	/*
	shouldComponentUpdate(nextProps) {
		// Should update only when getting init data and selecting new date
		return (this.props.dates.length === 0 && nextProps.dates.length > 0) || (
			this.props.selectedDate !== nextProps.selectedDate
		);
	}
	*/

	render() {
		//TODO: Set nextPath in App component?
		return (
			<FormPage
				title="When?"
				subtitle="Choose one date you can go out:"
				quote="Every day brings new choices."
				author="Martha Beck"
				button="One more question"
				valid={this.props.selectedDate}
				nextPath="/where">
				<form>
					{
						this.props.dates.map((date) => (
							<DateInput
								date={date}
								selected={this.props.selectedDate === date}
								onToggle={this.props.onSelectDate}
								key={date}/>
						))
					}
				</form>
			</FormPage>
		);
	}
}

export default When;
