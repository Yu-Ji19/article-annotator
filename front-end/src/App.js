import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Workspace from './components/Workspace';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navigation />
					<Switch>
						<Route path="/workspace" exact component={Workspace} />
						<Route path="/about" exact component={About} />
						<Route path="/" exact component={Home} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;