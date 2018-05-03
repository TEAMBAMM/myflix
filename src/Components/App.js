import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import SingleMovie from './SingleMovie';

const App = () => {
  return (
    <div id="Container">
      <Home />
      <div id="Content">
        {/* <Route exact path="/movies/:title" component={SingleMovie} /> */}
      </div>
    </div>
  );
};

export default App;
