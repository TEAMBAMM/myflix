import React from 'react';
import { Link } from 'react-router-dom';

const MiniMovie = props => {
  return (
    <div className="mini-movie-container">
      <div className="mini-movie-image">
        <Link to={`/${props.title}`}>
          <img src={props.image} alt="test movie image" />
        </Link>
      </div>
    </div>
  );
};
export default MiniMovie;
