import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import history from '../history';
import Header from './Header';
import AllMovies from './AllMovies';
import SingleMovie from './SingleMovie';
import Player from './Player';

const App = () => {
  return (
    <div>
      <Header />
      <Route path="*index.html" component={AllMovies} />
      <Route exact path="/:id/" component={SingleMovie} />
      {/* <Route exact path="/movie/:title/player" component={Player} /> */}
      {/* </Router> */}
    </div>
  );
};

export default withRouter(App);
