import React from 'react';
import { withRouter } from 'react-router-dom';
import { navTo } from './utils';
import AutoCompleteSearch from './AutoCompleteSearch';
import Filter from './Filter';
import Sort from './Sort';
import Cast from './Cast';
import Home from './Home';

const NavBar = props => {
  const {
    onChange,
    changeFilter,
    changeSort,
    toggleFavorites,
    filter,
    sort,
    searchInput,
    favorites,
    history,
    movies
  } = props;

  return (
    <div className="NavBarContainer">
      <div className="SearchNavDiv">
        <AutoCompleteSearch movies={movies} />
      </div>
      <div className="NavDiv" onClick={() => navTo('index.html', history)}>
        <Home />
      </div>
      <div className="NavDiv">
        <Filter changeFilter={changeFilter} />
      </div>
      <div className="NavDiv">
        <Sort />
      </div>
      <div className="NavDiv">
        <Cast />
      </div>
    </div>
  );
};

export default withRouter(NavBar);
