import React from 'react';
import ReactPlayer from 'react-player';
import { Link, BrowserRouter as Router } from 'react-router-dom';

const SingleMovie = () => {
  const title = props.match.params.title;
  return (
    <div className="container">
      <Router>
        <Link to={`/movies/${movie.title}/player`}>
          <div className="movie-image">
            <img src={dummyMovie[0].imageUrl} />
          </div>
        </Link>
      </Router>
      <div className="movie-info">
        <h1>Title</h1>
        <h3>Plot</h3>
        {/* <p>{dummyMovie[0].plot}</p> */}
        <h3>Rating</h3>
        {/* <p>{dummyMovie[0].rating}</p> */}
        <h3>Actors: </h3>
        {/* <ul>
          {dummyMovie[0].actors.map(actor => (
            <div key={actor.id}>
              <li key={actor.id}>{actor.name}</li>
            </div>
          ))}
        </ul> */}
        <h3>Genres: </h3>
        {/* <ul>
          {dummyMovie[0].genres.map(genre => (
            <div key={genre.id}>
              <li>{genre.name}</li>
            </div>
          ))}
        </ul> */}

        <h4>Release Date: </h4>
        {/* <p>{dummyMovie[0].releaseDate}</p> */}
        <h4>Rated: </h4>
        {/* <p>{dummyMovie[0].rated}</p> */}
      </div>
    </div>
  );
};

export default SingleMovie;
