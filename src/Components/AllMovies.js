import React from 'react';
import MiniMovie from './MiniMovie';
const movieArray = require('../../data/movieArray');
import history from '../history';

const AllMovies = props => {
  return (
    <div className="all-movies-view-container">
      {movieArray.map(movie => {
        return (
          <MiniMovie
            key={movie.imdbid}
            image={movie.poster}
            title={movie.title}
            history={props.history}
            imdbid={movie.imdbid}
          />
        );
      })}
    </div>
  );
};

export default AllMovies;
