import React from 'react';
import MiniMovie from './MiniMovie';

const AllMovies = props => {
  const { movies, selectMovie } = props;

  return (
    <div className="all-movies-view-container">
      {movies.map(movie => {
        return (
          <MiniMovie
            selectMovie={selectMovie}
            key={movie.imdbid}
            movie={movie}
          />
        );
      })}
    </div>
  );
};

export default AllMovies;
