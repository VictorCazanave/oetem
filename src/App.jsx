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
				areas: new Set(),
				temperature: {
					min: -100,
					max: 100
				},
				skys: new Set()
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
			let selectedAreas = new Set([...prevState.selected.areas]);

			if (isSelected) {
				// Add area
				selectedAreas.add(selectedArea);
			} else {
				// Remove area
				selectedAreas.delete(selectedArea);
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
			let selectedSkys = new Set([...prevState.selected.skys]);

			if (isSelected) {
				// Add sky
				selectedSkys.add(selectedSky);
			} else {
				// Remove sky
				selectedSkys.delete(selectedSky);
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
				<Route exact={true} path="/" component={Home}/>
				<Route
					path="/when"
					render={(props) => (
						<When
							dates={this.initData.dates}
							selectedDate={this.state.selected.date}
							onSelectDate={this.handleSelectDate}
							{...props}/>
					)}/>
				<Route
					path="/where"
					render={(props) => (
						<Where
							areas={this.initData.areas}
							selectedAreas={this.state.selected.areas}
							onSelectArea={this.handleSelectArea}
							{...props}/>
					)}/>
				<Route
					path="/what"
					render={(props) => (
						<What
							temperature={this.initData.temperature}
							selectedTemperature={this.state.selected.temperature}
							onSelectTemperature={this.handleSelectTemperature}
							skys={this.initData.skys}
							selectedSkys={this.state.selected.skys}
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
