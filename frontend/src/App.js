import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import history from './history';
import '../src/styles/global.scss'

import Home from './pages/Home.js';
import Board from './pages/Board.js';

function App() {
  return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/board/:id" component={Board} exact />
        </Switch>
      </Router>
  );
}

export default App;
