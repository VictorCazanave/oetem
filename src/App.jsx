import React from 'react';
import update from 'immutability-helper';
import {Fullpage, Slide} from 'fullpage-react';

import Home from './components/Home/Home';
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

		// Active slide (no need to re-render)
		this.activeSlide = 0;

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
		this.handleSlideChangeEnd = this.handleSlideChangeEnd.bind(this);
		this.handleClickNext = this.handleClickNext.bind(this);
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

	handleClickNext(event) {
		event.preventDefault();
		Fullpage.changeFullpageSlide(++this.activeSlide);
	}

	handleSlideChangeEnd(name, props, state, newState) {
		this.activeSlide = newState.activeSlide;
	}

	render() {
		const slides = [
			<Slide>
				<Home onClickNext={this.handleClickNext}/>
			</Slide>,
			<Slide>
				<When
					dates={this.initData.dates}
					onSelectDate={this.handleSelectDate}
					onClickNext={this.handleClickNext}/>
			</Slide>,
			<Slide>
				<Where
					areas={this.initData.areas}
					onSelectArea={this.handleSelectArea}
					onClickNext={this.handleClickNext}/>
			</Slide>,
			<Slide>
				<What
					temperature={this.initData.temperature}
					onSelectTemperature={this.handleSelectTemperature}
					skys={this.initData.skys}
					onSelectSky={this.handleSelectSky}
					onClickNext={this.handleClickNext}/>
			</Slide>,
			<Slide>
				<Matches selected={this.state.selected}/>
			</Slide>
		];

		return (
			<Fullpage
				slides={slides}
				onSlideChangeEnd={this.handleSlideChangeEnd}
				scrollSensitivity="2"
				touchSensitivity="2"
				scrollSpeed="500"
				resetSlides="true"
				hideScrollBars="true"
				enableArrowKeys="true"></Fullpage>
		);
	}
}

export default App;
