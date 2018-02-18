import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import update from 'immutability-helper';

import Home from './components/Home/Home';
import When from './components/Forms/When';
import Where from './components/Forms/Where';
import What from './components/Forms/What';
import Matches from './components/Matches/Matches';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			displayMatches: false,
			selected: {
				date: null,
				areas: [],
				temperature: {
					min: -100,
					max: 100
				},
				skys: []
			}
		};

		// Init data that will not change later
		this.initData = {
			dates: [],
			areas: [],
			temperature: {
				min: -100,
				max: 100
			},
			skys: []
		};

		this.handleSelectDate = this.handleSelectDate.bind(this);
		this.handleSelectArea = this.handleSelectArea.bind(this);
		this.handleSelectTemperature = this.handleSelectTemperature.bind(this);
		this.handleSelectSky = this.handleSelectSky.bind(this);
	}

	componentDidMount() {
		fetch('init.json').then((response) => {
			return response.json()
		}).then((json) => {
			// Set init data and selected temperature
			this.initData = json;
			this.setState((prevState) => {
				return update(prevState, {
					selected: {
						temperature: {
							$set: json.temperature
						}
					}
				});
			});
		}).catch((err) => {
			console.error('Parsing init.json failed', err)
		})
	}

	//TODO: Use object spread instead of immutability-helper?
	//TODO: Really need to update state everytime?
	//TODO: Maybe send data only when clicking on the next button?
	//TODO: But need to block the scroll and arrow

	handleSelectDate(selectedDate) {
		this.setState((prevState) => {
			return update(prevState, {
				selected: {
					date: {
						$set: selectedDate
					}
				}
			});
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
				selectedAreas = prevState.selected.areas.filter(area => area.id !== selectedArea.id);
			}

			return update(prevState, {
				selected: {
					areas: {
						$set: selectedAreas
					}
				}
			});
		});
	}

	handleSelectTemperature(selectedTemperature) {
		this.setState((prevState) => {

			return update(prevState, {
				selected: {
					temperature: {
						$set: selectedTemperature
					}
				}
			});
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
				selectedSkys = prevState.selected.skys.filter(sky => sky.id !== selectedSky.id);
			}

			return update(prevState, {
				selected: {
					skys: {
						$set: selectedSkys
					}
				}
			});
		});
	}

	render() {
		return (
			<Switch>
				<Route exact="true" path="/" component={Home}/>
				<Route
					path="/when"
					render={(props) => (<When dates={this.initData.dates} onSelectDate={this.handleSelectDate} {...props}/>)}/>
				<Route
					path="/where"
					render={(props) => (<Where areas={this.initData.areas} onSelectArea={this.handleSelectArea} {...props}/>)}/>
				<Route
					path="/what"
					render={(props) => (
						<What
							temperature={this.initData.temperature}
							onSelectTemperature={this.handleSelectTemperature}
							skys={this.initData.skys}
							onSelectSky={this.handleSelectSky}
							{...props}/>
					)}/>
				<Route
					path="/matches"
					render={(props) => (<Matches display={this.state.displayMatches} selected={this.state.selected} {...props}/>)}/>
			</Switch>
		);
	}
}

export default App;
