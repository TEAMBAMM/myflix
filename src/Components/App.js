import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import SingleMovie from './SingleMovie';

const App = () => {
  return (
    <div id="Container">
      <Home />
      <Router>
        <div>
          <Route path="/movies/:title" component={SingleMovie} />
        </div>
      </Router>
    </div>
  );
};

export default App;
