import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Login from "../src/pages/Login"
import Home from "../src/pages/Home"

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/" exact component={Login} />
      </Switch>
    );
  }
}

export default App;
