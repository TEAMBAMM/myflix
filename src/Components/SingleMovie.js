import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
// dummy data (to be removed later)
const dummyMovie = require('../Style/dummydata/singlemovie.json');

const SingleMovie = () => {
  return (
    <div className="container">
      <Link to={`/movietitle`}>
        <div className="movie-image">
          <img src={dummyMovie[0].imageUrl} />
        </div>
      </Link>
      <div className="movie-info">
        <h1>{dummyMovie[0].title}</h1>
        <h3>Plot</h3>
        <p>{dummyMovie[0].plot}</p>
        <h3>Rating</h3>
        <p>{dummyMovie[0].rating}</p>
        <h3>Genres: </h3>
        {dummyMovie[0].genres.map(genre => (
          <ul key={dummyMovie[0].id}>
            <li>{genre}</li>
          </ul>
        ))}

        <h4>Release Date: </h4>
        <p>{dummyMovie[0].releaseDate}</p>
        <h4>Rated: </h4>
        <p>{dummyMovie[0].rated}</p>
      </div>
    </div>
  );
};

export default SingleMovie;
