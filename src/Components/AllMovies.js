import React from 'react';
import MiniMovie from './MiniMovie';
import { movies } from '../../data/movieArray';

const AllMovies = props => {
  console.log(movies[0]);
  return (
    <div className="all-movies-view-container">
      {movies.map(movie => {
        return <MiniMovie key={movie.imdbid} />;
      })}
    </div>
  );
};

export default AllMovies;
