import React from 'react';
import { withRouter } from 'react-router-dom';
import { navTo } from './utils';
import AutoCompleteSearch from './AutoCompleteSearch';
import Filter from './Filter';
import Sort from './Sort';
import Cast from './Cast';
import Home from './Home';
import CastControls from './CastControls'
import OptionsIcon from './OptionsIcon'

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
    movies,
    castReceivers,
    selectedMovie,
    ip,
    deselectMovie,
    isCasting,
    toggleCasting,
    filePath,
    changeFilePath
  } = props;

  const navDeselect = () => {
    deselectMovie()
    navTo('index.html', history)
  }

  const ShowControls = (isCasting) ? CastControls : () => (<div></div>)

  return (
    <div className="MainNavBarContainer">
      <div className="NavBarContainer">
        <div className="SearchNavDiv">
          <AutoCompleteSearch movies={movies} />
        </div>
        <div className="NavDiv" onClick={() => navDeselect()}>
          <Home />
        </div>
        <div className="NavDiv">
          <Filter changeFilter={changeFilter} />
        </div>
        <div className="NavDiv">
          <Sort changeSort={changeSort} />
        </div>
        <div className="NavDiv">
          <Cast castReceivers={castReceivers} selectedMovie={selectedMovie} ip={ip} toggleCasting={toggleCasting} />
        </div>
        <div>
          <ShowControls toggleCasting={toggleCasting}/>
        </div>
      </div>
      <div className="OptionsContainer">
        <OptionsIcon filePath={filePath} changeFilePath={changeFilePath}/>
      </div>
    </div>
  );
};

export default withRouter(NavBar);
