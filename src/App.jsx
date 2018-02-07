import React from 'react';
import update from 'immutability-helper';

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
			init: {
				dates: [],
				areas: [],
				temperature: {
					min: -100,
					max: 100
				},
				skys: []
			},
			selected: {
				date: null,
				areas: [],
				temperature: {
					min: -100,
					max: 100
				},
				skys: []
			},
			matches: []
		};

		this.handleSelectDate = this.handleSelectDate.bind(this);
		this.handleSelectArea = this.handleSelectArea.bind(this);
		this.handleSelectTemperature = this.handleSelectTemperature.bind(this);
		this.handleSelectSky = this.handleSelectSky.bind(this);
		this.handleClickGo = this.handleClickGo.bind(this);
	}

	componentDidMount() {
		fetch('init.json').then((response) => {
			return response.json()
		}).then((json) => {
			// Set init state and selected temperature
			this.setState((prevState) => {
				return update(prevState, {
					init: {
						$set: json
					},
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

	handleClickGo() {
		for (const area of this.state.selected.areas) {
			const url = `/${this.state.selected.date}_${area.id}.json`;

			fetch(url).then((response) => {
				return response.json()
			}).then((json) => {
				this.searchMatches(json.area.locations, this.state.selected);
			}).catch((err) => {
				console.error(`parsing ${url} failed`, err)
			})
		}
	}

	searchMatches(locations, selected) {
		const matches = locations.filter(location => this.match(location.weather, selected));
		this.setState((prevState) => {
			return update(prevState, {
				matches: {
					$set: matches
				}
			});
		});
	}

	match(weather, selected) {
		return (weather.minTemperature.value >= selected.temperature.min) && (
			weather.maxTemperature.value <= selected.temperature.max
		) && (selected.skys.find(sky => sky.id === weather.sky.id));
	}

	render() {
		return (
			<div>
				<h1>oeteM</h1>
				<Summary selected={this.state.selected}/>
				<When
					dates={this.state.init.dates}
					selectedDate={this.state.selected.date}
					onSelectDate={this.handleSelectDate}/>
				<Where
					areas={this.state.init.areas}
					selectedAreas={this.state.selected.areas}
					onSelectArea={this.handleSelectArea}/>
				<What
					temperature={this.state.init.temperature}
					selectedTemperature={this.state.selected.temperature}
					onSelectTemperature={this.handleSelectTemperature}
					skys={this.state.init.skys}
					selectedSkys={this.state.selected.skys}
					onSelectSky={this.handleSelectSky}/>
				<button onClick={this.handleClickGo}>Let's go!</button>
				<Matches matches={this.state.matches}/>
			</div>
		);
	}
}

export default App;
