import React from 'react';
import ReactPlayer from 'react-player';
const movieArray = require('../../data/movieArray'); // to be removed later

class SingleMovie extends React.Component {
  render() {
    const imdbid = this.props.match.params.id;
    const movie = movieArray.filter(movie => imdbid === movie.imdbid)[0]; // to be removed later when database is established
    return (
      <div className="singlemovie-container">
        <div className="movie-image">
          <img src={movie.poster} />
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
          <p>{movie.released}</p>
          <h3>Rated: </h3>
          <p>{movie.rated}</p>
        </div>
      </div>
    );
  }
}

export default SingleMovie;
