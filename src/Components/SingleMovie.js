import React from 'react';
import { withRouter } from 'react-router-dom';
import { navTo } from './utils';
import PlayTrailer from './PlayTrailer'
import Paper from 'material-ui/Paper'

const SingleMovie = props => {
  const { movies, history, PORT } = props;
  const imdbid = props.match.params.id;
  const movie = movies.filter(movie => imdbid === movie.imdbid)[0];
  const ip = (movie.ip) ? movie.ip : 'localhost'
  const actorsList = movie.actors.join(', ');
  const genreList = movie.genres.join(', ');
  const fileName = movie.fileName;
  movie.released =  movie.released !== null ? movie.released.split('T')[0] : 'Unknown';

  const style = {
    paddingTop: 3,
    height: 426,
    width: 302,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <div className="singlemovie-container">
      <div className="thumb">
        <div
          className="overlay"
          onClick={() => navTo(`/${imdbid}/player/`, history)}
        >
          <Paper style={style} zDepth={3} rounded={false}>
            <div>
              <img
                src={`http://${ip}:${PORT}/${fileName}-poster.jpg`}
                className="mini-movie-image"
              />
            </div>
          </Paper>
          <div className="playWrapper">
            <span className="playBtn">
              <img
                src={`http://localhost:${PORT}/play-button.png`}
                width="50"
                height="50"
                alt=""
              />
            </span>
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h1>
          {movie.title} ({movie.year})
        </h1>
        <h3>Plot:</h3>
        <p>{movie.plot}</p>
        <h3>Rating:</h3>
        <p>{movie.rating}</p>
        <h3>Actors:</h3>
        <p>{actorsList}</p>
        <h3>Genres:</h3>
        <p>{genreList}</p>
        <h3>Release Date: </h3>
        <p>{movie.released}</p>
        <h3>Rated: </h3>
        <p>{movie.rated}</p>
        <PlayTrailer movie={movie}/>
      </div>
    </div>
  );
};

export default withRouter(SingleMovie);
