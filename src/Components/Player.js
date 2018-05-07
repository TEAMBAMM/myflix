import React from 'react';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom';

const Player = props => {
  const { movies } = props;
  const imdbid = props.match.params.id;
  const movie = movies.filter(movie => imdbid === movie.imdbid)[0];
  const movieUrl = movie.videoplayer;
  // const filename = 'StarWarsTheLastJedi.mp4';

  return (
    <div className="player-container">
      <div className="player-overlay">
        <a href="#">
          <ReactPlayer
            url={movieUrl}
            controls={true}
            volume={1}
            muted={false}
            playing
            className="react-player"
            width="100%"
            height="100%"
          />
        </a>
        <a href="#" className="controls-wrapper">
          <span className="controlsBtn">
            <button>Back</button>
            <button>FastBack</button>
            <button>Play/Stop</button>
            <button>FastForward</button>
            <button>FastForward</button>
            <button>Fullscreen</button>
          </span>
        </a>
      </div>
    </div>
  );
};

export default withRouter(Player);
