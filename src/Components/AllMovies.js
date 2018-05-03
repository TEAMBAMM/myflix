import React from 'react';
import MiniMovie from './MiniMovie';
const movieArray = require('../../data/movieArray');

const AllMovies = props => {
  return (
    <div className="all-movies-view-container">
      {movieArray.map(movie => {
        return (
          <MiniMovie
            key={movie.imdbid}
            image={movie.poster}
            title={movie.title}
          />
        );
      })}
    </div>
  );
};

export default AllMovies;
