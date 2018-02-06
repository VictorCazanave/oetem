import React from 'react';
import Summary from './components/Summary/Summary';
import When from './components/When/When';
import Where from './components/Where/Where';
import What from './components/What/What';
import Matches from './components/Matches/Matches';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			dates: [
				'2018-01-04',
				'2018-01-05',
				'2018-01-06',
				'2018-01-07',
				'2018-01-08',
				'2018-01-09',
				'2018-01-10'
			],
			areas: [
				{
					name: 'Taipei City',
					id: '63'
				}, {
					name: 'Kaohsiung City',
					id: '64'
				}, {
					name: 'New Taipei City',
					id: '65'
				}, {
					name: 'Taichung City',
					id: '66'
				}, {
					name: 'Tainan City',
					id: '67'
				}, {
					name: 'Taoyuan City',
					id: '68'
				}, {
					name: 'Matsu Area',
					id: '09007'
				}, {
					name: 'kinmen Area',
					id: '09020'
				}, {
					name: 'Yilan County',
					id: '10002'
				}, {
					name: 'Hsinchu County',
					id: '10004'
				}, {
					name: 'miaoli County',
					id: '10005'
				}, {
					name: 'Changhua County',
					id: '10007'
				}, {
					name: 'Nantou County',
					id: '10008'
				}, {
					name: 'Yunlin County',
					id: '10009'
				}, {
					name: 'Chiayi County',
					id: '10010'
				}, {
					name: 'Pingtung County',
					id: '10013'
				}, {
					name: 'Taitung County',
					id: '10014'
				}, {
					name: 'Hualien County',
					id: '10015'
				}, {
					name: 'Penghu County',
					id: '10016'
				}, {
					name: 'Keelung City',
					id: '10017'
				}, {
					name: 'Hsinchu City',
					id: '10018'
				}, {
					name: 'Chiayi City',
					id: '10020'
				}
			],
			selected: {
				date: null,
				areas: [],
				temperature: {
					min: -20,
					max: 50
				}
			},
			matches: []
		};

		this.handleSelectDate = this.handleSelectDate.bind(this);
		this.handleSelectArea = this.handleSelectArea.bind(this);
		this.handleChangeTemperature = this.handleChangeTemperature.bind(this);
		this.handleClickGo = this.handleClickGo.bind(this);
	}

	handleSelectDate(selectedDate) {
		this.setState((prevState) => {
			return {
				selected: {
					date: selectedDate,
					areas: prevState.selected.areas
				}
			}
		});
	}

	handleSelectArea(selectedArea, isSelected) {
		this.setState((prevState) => {
			let selectedAreas = [];

			if (isSelected) {
				selectedAreas = prevState.selected.areas.slice();
				selectedAreas.push(selectedArea);
			} else {
				selectedAreas = prevState.selected.areas.filter(area => area !== selectedArea);
			}

			return {
				selected: {
					date: prevState.selected.date,
					areas: selectedAreas
				}
			};
		});
	}

	handleChangeTemperature(temperature) {
		console.log('temperature', temperature);
	}

	handleClickGo() {
		this.state.selected.areas.forEach((area) => {
			const url = `/${this.state.selected.date.replace(/-/g, '')}_${area.id}.json`;

			fetch(url).then((response) => {
				return response.json()
			}).then((json) => {
				console.log('parsed json', json)
				this.setState({matches: json.area.location});
			}).catch((err) => {
				console.log('parsing failed', err)
			})
		});
	}

	render() {
		return (<div>
			<h1>oeteM</h1>
			<Summary selected={this.state.selected}/>
			<When dates={this.state.dates} selectedDate={this.state.selected.date} onSelect={this.handleSelectDate}/>
			<Where areas={this.state.areas} selectedAreas={this.state.selected.areas} onSelect={this.handleSelectArea}/>
			<What temperature={this.state.selected.temperature} onChangeTemperature={this.handleChangeTemperature}/>
			<button onClick={this.handleClickGo}>Let's go!</button>
			<Matches matches={this.state.matches}/>

		</div>);
	}
}

export default App;
