import React from 'react';
import MiniMovie from './MiniMovie';
import CircularProgress from 'material-ui/CircularProgress';
import NoFile from './NoFile'

const AllMovies = props => {
  const { movies, selectMovie, isLoading, filePath, changeFilePath } = props;

  if (isLoading) {
    return (
      <div id="Loading">
        <CircularProgress size={80} thickness={5} />
      </div>
    );
  } else if(filePath === '') {
    return(
      <div>
        <NoFile changeFilePath={changeFilePath} />
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
