import React from 'react';
import { Router, Switch, Route} from 'react-router';
// import { Link } from 'react-router-dom'
import history from './history';

import Home from './pages/Home.js';
import Board from './pages/Board.js';
// import Login from './pages/Login.js';
// import About from './pages/About.js';


function App() {
  return (
    <div> 
      <Router history={history}>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/board" component={Board} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
