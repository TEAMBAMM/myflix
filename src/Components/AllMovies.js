import React from 'react';
import MiniMovie from './MiniMovie';

const AllMovies = props => {
  const { movies } = props;

  return (
    <div className="all-movies-view-container">
      {movies.map(movie => {
        return (
          <MiniMovie
            key={movie.imdbid}
            fileName={movie.fileName}
            imdbid={movie.imdbid}
          />
        );
      })}
    </div>
  );
};

export default AllMovies;
