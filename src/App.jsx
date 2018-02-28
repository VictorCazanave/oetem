import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { sortBy, updateValue, updateArray } from './utils/ImmutabilityUtils';
import { storeDate, storeAreas, storeTemperature, storeSkys, getStorage, clearStorage } from './utils/StorageUtils';
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
				areas: [],
				temperature: {
					min: -100,
					max: 100
				},
				skys: []
			}
		};

		// Init data that will not change later
		this.init = {
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
		this.handleClickAgain = this.handleClickAgain.bind(this);
	}

	componentDidMount() {
		fetch('init.json').then((response) => {
			return response.json()
		}).then((json) => {
			// Set init data
			this.init = {
				dates: json.dates,
				areas: sortBy(json.areas, 'name'), // Sort areas
				temperature: json.temperature,
				skys: json.skys
			};

			// Store init temperature if no selected temperature
			if (getStorage().temperature === null) {
				storeTemperature(this.init.temperature);
			}

			// Set state with stored data
			this.setState((prevState) => {
				return updateValue(prevState, 'selected', getStorage());
			});
		}).catch((err) => {
			console.error('Parsing init.json failed', err)
		})
	}

	componentDidUpdate(prevProps) {
		// Scroll to top when changing route
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0)
		}
	}

	handleSelectDate(selectedDate) {
		// Set and store selected date
		this.setState((prevState) => {
			const newState = updateValue(prevState, 'selected.date', selectedDate);
			storeDate(newState.selected.date);

			return newState;
		});
	}

	handleSelectArea(selectedArea, isSelected) {
		// Add/remove and store selected area
		this.setState((prevState) => {
			const newState = updateArray(prevState, 'selected.areas', selectedArea, isSelected)
			storeAreas(newState.selected.areas);

			return newState;
		});
	}

	handleSelectTemperature(selectedTemperature) {
		// Set and store selected temperature
		this.setState((prevState) => {
			const newState = updateValue(prevState, 'selected.temperature', selectedTemperature);
			storeTemperature(newState.selected.temperature);

			return newState;
		});
	}

	handleSelectSky(selectedSky, isSelected) {
		// Add/remove and store selected sky
		this.setState((prevState) => {
			const newState = updateArray(prevState, 'selected.skys', selectedSky, isSelected)
			storeSkys(newState.selected.skys);

			return newState;
		});
	}

	handleClickAgain() {
		// Reset forms
		this.setState({
			selected: {
				date: null,
				areas: [],
				temperature: this.init.temperature,
				skys: []
			}
		});

		// Reset storage
		clearStorage(this.init.temperature);
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
									dates={this.init.dates}
									selectedDate={this.state.selected.date}
									onSelectDate={this.handleSelectDate}
									nextPath="/where"
									{...props}/>
							)}/>
						<Route
							path="/where"
							render={(props) => (
								<Where
									areas={this.init.areas}
									selectedAreas={this.state.selected.areas}
									onSelectArea={this.handleSelectArea}
									nextPath="/what"
									{...props}/>
							)}/>
						<Route
							path="/what"
							render={(props) => (
								<What
									temperature={this.init.temperature}
									selectedTemperature={this.state.selected.temperature}
									onSelectTemperature={this.handleSelectTemperature}
									skys={this.init.skys}
									selectedSkys={this.state.selected.skys}
									onSelectSky={this.handleSelectSky}
									nextPath="/matches"
									{...props}/>
							)}/>
						<Route
							path="/matches"
							render={(props) => (
								<Matches selected={this.state.selected} onClickAgain={this.handleClickAgain} againPath="/when" {...props}/>
							)}/>
					</Switch>
				</CSSTransition>
			</TransitionGroup>
		);
	}
}

export default withRouter(App);
