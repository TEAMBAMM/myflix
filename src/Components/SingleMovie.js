import React from 'react';
import { withRouter } from 'react-router-dom';
import { navTo } from './utils';

const SingleMovie = props => {
  const { movies, history } = props;
  const imdbid = props.match.params.id;
  const movie = movies.filter(movie => imdbid === movie.imdbid)[0]; // to be removed later when database is established

  return (
    <div className="singlemovie-container">
      <div className="thumb">
        <div className="overlay">
          <a href="#">
            <img src={movie.poster} className="thumbnail" />
          </a>
          <a href="#" className="playWrapper">
            <span className="playBtn">
              <img
                src="http://wptf.com/wp-content/uploads/2014/05/play-button.png"
                width="50"
                height="50"
                alt=""
                onClick={() => navTo(`/${imdbid}/player/`, history)}
                alt="test movie image"
              />
            </span>
          </a>
        </div>
      </div>
      <div className="movie-info">
        <h1>
          {movie.title} ({movie.year})
        </h1>
        <h3>Plot</h3>
        <p>{movie.plot}</p>
        <h3>Rating</h3>
        <p>{movie.rating}</p>
        <h3>Actors: </h3>
        <p>{movie.actors}</p>
        <h3>Genres: </h3>
        <p>{movie.genres}</p>
        <h3>Release Date: </h3>
        <p>{movie.released.split('T')[0]}</p>
        <h3>Rated: </h3>
        <p>{movie.rated}</p>
      </div>
    </div>
  );
};

export default withRouter(SingleMovie);
