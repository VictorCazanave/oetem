import React from 'react';
import PropTypes from 'prop-types';
import FormPage from 'components/Forms/FormPage/FormPage';
import DateInput from 'components/Forms/Inputs/DateInput/DateInput';

function When(props) {
	return (
		<FormPage
			title="When?"
			subtitle="Choose one date you can go out:"
			quote="Every day brings new choices."
			author="Martha Beck"
			button="One more question"
			valid={props.selectedDate !== null}
			nextPath={props.nextPath}>
			<form>
				{props.dates.map(date => <DateInput date={date} selected={props.selectedDate === date} onToggle={props.onSelectDate} key={date} />)}
			</form>
		</FormPage>
	);
}

When.propTypes = {
	dates: PropTypes.arrayOf(PropTypes.string),
	selectedDate: PropTypes.string,
	onSelectDate: PropTypes.func,
	nextPath: PropTypes.string
};

export default When;
