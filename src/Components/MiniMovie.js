import React from 'react';
import { Link } from 'react-router-dom';

const MiniMovie = props => {
  return (
    <div className="mini-movie-container">
      <Link to={`/movie/testmoviename`}>
        <div className="mini-movie-image">
          <img
            src="https://ia.media-imdb.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_UY209_CR0,0,140,209_AL_.jpg"
            alt="test movie image"
          />
        </div>
      </Link>
    </div>
  );
};
export default MiniMovie;
