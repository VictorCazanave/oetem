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
			}
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

	//TODO: Use  Object spread instead of immutability-helper?

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
			<div>
				<h1>oeteM</h1>
				<Summary data={this.state.selected}/>
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
				<Matches selected={this.state.selected}/>
			</div>
		);
	}
}

export default App;
