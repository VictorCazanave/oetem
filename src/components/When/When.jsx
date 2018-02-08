import React from 'react';
import DateInput from './DateInput';

class When extends React.Component {

	constructor() {
		super();
	}

	//TODO: Keep it? It is more optimized but more risky
	shouldComponentUpdate() {
		// Should update only when getting init data, because after there is no more changes
		return (this.props.dates.length === 0);
	}

	render() {
		return (
			<section>
				<header>
					<h1>When?</h1>
					<p>Choose the date of your desired weather</p>
				</header>
				<form>
					{
						this.props.dates.map((date) => (
							<div key={date}>
								<DateInput date={date} onToggle={this.props.onSelectDate}></DateInput>
							</div>
						))
					}
				</form>
				<footer>
					<button onClick={this.props.onClickNext}>One more question</button>
				</footer>
			</section>
		);
	}
}

export default When;
