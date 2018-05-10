import React from 'react';
import MiniMovie from './MiniMovie';
import CircularProgress from 'material-ui/CircularProgress'

const AllMovies = props => {

  const { movies, selectMovie, isLoading } = props;

  if(isLoading) {
    return (
      <div id='Loading'>
        <CircularProgress size={80} thickness={5} />
      </div>
    )
  } else {
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
  }
};

export default AllMovies;
