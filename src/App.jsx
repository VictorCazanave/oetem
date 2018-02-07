import React from 'react';
import Summary from './components/Summary/Summary';
import When from './components/When/When';
import Where from './components/Where/Where';
import What from './components/What/What';
import Matches from './components/Matches/Matches';
import './App.css';
import 'react-input-range/lib/css/index.css'

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
			temperature: {
				//TODO: Use these values to initialize TemperatureInput
				min: -10,
				max: 40
			},
			skys: [
				{
					label: 'Sunny',
					id: '01'
				}, {
					label: 'Partly cloudy',
					id: '02'
				}, {
					label: 'Cloudy',
					id: '03'
				}, {
					label: 'Super cloudy',
					id: '04'
				}, {
					label: 'Raining',
					id: '05'
				}
			],
			selected: {
				date: null,
				areas: [],
				temperature: {
					min: -10,
					max: 40
				},
				skys: []
			},
			matches: []
		};

		this.handleSelectDate = this.handleSelectDate.bind(this);
		this.handleSelectArea = this.handleSelectArea.bind(this);
		this.handleChangeTemperature = this.handleChangeTemperature.bind(this);
		this.handleSelectSky = this.handleSelectSky.bind(this);
		this.handleClickGo = this.handleClickGo.bind(this);
	}

	//TODO: Find a better to handle events

	handleSelectDate(selectedDate) {
		this.setState((prevState) => {
			return {
				selected: {
					date: selectedDate,
					areas: prevState.selected.areas,
					temperature: prevState.selected.temperature,
					skys: prevState.selected.skys
				}
			}
		});
	}

	handleSelectArea(selectedArea, isSelected) {
		this.setState((prevState) => {
			let selectedAreas = [];

			if (isSelected) {
				// Add area
				selectedAreas = [
					...prevState.selected.areas,
					selectedArea
				];
			} else {
				// Remove area
				selectedAreas = prevState.selected.areas.filter(area => area !== selectedArea);
			}

			return {
				selected: {
					date: prevState.selected.date,
					areas: selectedAreas,
					temperature: prevState.selected.temperature,
					skys: prevState.selected.skys
				}
			};
		});
	}

	handleChangeTemperature(changedTemperature) {
		this.setState((prevState) => {

			return {
				selected: {
					date: prevState.selected.date,
					areas: prevState.selected.areas,
					temperature: changedTemperature,
					skys: prevState.selected.skys
				}
			};
		});
	}

	handleSelectSky(selectedSky, isSelected) {
		this.setState((prevState) => {
			let selectedSkys = [];

			if (isSelected) {
				// Add sky
				selectedSkys = [
					...prevState.selected.skys,
					selectedSky
				];
			} else {
				// Remove sky
				selectedSkys = prevState.selected.skys.filter(sky => sky !== selectedSky);
			}

			return {
				selected: {
					date: prevState.selected.date,
					areas: prevState.selected.areas,
					temperature: prevState.selected.temperature,
					skys: selectedSkys
				}
			};
		});
	}

	handleClickGo() {
		this.state.selected.areas.forEach((area) => {
			const url = `/${this.state.selected.date.replace(/-/g, '')}_${area.id}.json`;

			fetch(url).then((response) => {
				return response.json()
			}).then((json) => {
				console.log('parsed json', json)
				//TODO: Fix location(s) name
				this.searchMatches(json.area.location, this.state.selected);
			}).catch((err) => {
				console.log('parsing failed', err)
			})
		});
	}

	searchMatches(locations, selected) {
		const matches = locations.filter((location) => {
			return this.match(location.weather, selected);
		});

		this.setState({matches: matches});
	}

	match(weather, selected) {
		return (weather.minTemperature.value >= selected.temperature.min) && (weather.maxTemperature.value <= selected.temperature.max) && (selected.skys.includes(weather.sky));
	}

	render() {
		return (<div>
			<h1>oeteM</h1>
			<Summary selected={this.state.selected}/>
			<When dates={this.state.dates} selectedDate={this.state.selected.date} onSelectDate={this.handleSelectDate}/>
			<Where areas={this.state.areas} selectedAreas={this.state.selected.areas} onSelectArea={this.handleSelectArea}/>
			<What temperature={this.state.selected.temperature} onChangeTemperature={this.handleChangeTemperature} skys={this.state.skys} selectedSkys={this.state.selected.skys} onSelectSky={this.handleSelectSky}/>
			<button onClick={this.handleClickGo}>Let's go!</button>
			<Matches matches={this.state.matches}/>
		</div>);
	}
}

export default App;
