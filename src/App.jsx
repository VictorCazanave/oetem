import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import update from 'immutability-helper';
import { getSortedAreas } from './Utils/AreaUtils';
import Home from './components/Home/Home';
import When from './components/Forms/When/When';
import Where from './components/Forms/Where/Where';
import What from './components/Forms/What/What';
import Matches from './components/Matches/Matches';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
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
			// Set init data
			this.initData = json;

			// Sort areas
			this.initData.areas = getSortedAreas(json.areas)

			// Set selected temperature
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

	componentDidUpdate(prevProps) {
		// Scroll to top when changing route
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0)
		}
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
		// this.props.location comes from withRouter HOC
		// https://medium.com/@pshrmn/a-shallow-dive-into-react-router-v4-animated-transitions-4b73f634992a
		// TODO: Use ReactCSSTransitionGroup?
		// https://reactjs.org/docs/animation.html#high-level-api-reactcsstransitiongroup
		return (
			<TransitionGroup>
				<CSSTransition key={this.props.location.key} classNames="route" timeout={600}>
					<Switch location={this.props.location}>
						<Route exact={true} path="/" component={Home}/>
						<Route
							path="/when"
							render={(props) => (
								<When
									dates={this.initData.dates}
									selectedDate={this.state.selected.date}
									onSelectDate={this.handleSelectDate}
									nextPath="/where"
									{...props}/>
							)}/>
						<Route
							path="/where"
							render={(props) => (
								<Where
									areas={this.initData.areas}
									selectedAreas={this.state.selected.areas}
									onSelectArea={this.handleSelectArea}
									nextPath="/what"
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
									nextPath="/matches"
									{...props}/>
							)}/>
						<Route
							path="/matches"
							render={(props) => (<Matches selected={this.state.selected} firstPath="/when" {...props}/>)}/>
					</Switch>
				</CSSTransition>
			</TransitionGroup>
		);
	}
}

export default withRouter(App);
