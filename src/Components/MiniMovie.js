import React from 'react';
import { Link } from 'react-router-dom';

const MiniMovie = props => {
  return (
    <div className="mini-movie-container">
      {/* <Link to={`/movies/${props.title}`}> */}
      <div className="mini-movie-image">
        <img src={props.image} alt="test movie image" />
      </div>
      {/* </Link> */}
    </div>
  );
};
export default MiniMovie;
