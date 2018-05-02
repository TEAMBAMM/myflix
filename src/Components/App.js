import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SingleMovie from './SingleMovie';

const App = () => {
  return (
    <Router>
      <div>
        <Route path="/singlemovie" component={SingleMovie} />
      </div>
    </Router>
  );
};
export default App;
