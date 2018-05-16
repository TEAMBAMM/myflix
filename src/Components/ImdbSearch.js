import React from 'react';
import MiniMovie from './MiniMovie';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField'
import MiniResult from './MiniResult';

const ImdbSearch = props => {
  const { selectMovie, isLoading } = props;

  

  if (isLoading) {
    return (
      <div id="Loading">
        <CircularProgress size={80} thickness={5} />
      </div>
    );
  } else {
    return (
      <div> 
        <div>
          <TextField id="imdb-search" />
        </div>
        <div className="all-movies-view-container">
          {/* {movies.map(movie => {
            return (
              <MiniResult
                selectMovie={selectMovie}
                key={movie.imdbid}
                movie={movie}
              />
            );
          })} */}
        </div>
      </div>
    );
  }
};

export default AllMovies;
