import React from 'react';
// import history from '../history';
import { Link } from 'react-router-dom';

const MiniMovie = props => {
  return (
    <div className="mini-movie-container">
      <div className="mini-movie-image">
        <Link to={`/${props.imdbid}/`}>
          <img src={props.image} alt="test movie image" />
        </Link>
      </div>
    </div>
  );
};
export default MiniMovie;
