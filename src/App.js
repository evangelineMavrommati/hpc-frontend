import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MapContainer from './components/MapContainer';
import DashTabs from './components/DashTabs';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    const reload = () => window.location.reload();
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/home" component={ Home } />
            <Route path="/map" component={ MapContainer } />
            <Route path="/dashboard" component={ DashTabs } />
            <Route path="/" component={ Home }>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
