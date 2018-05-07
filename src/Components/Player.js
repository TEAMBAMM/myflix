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
    </div>
  );
};

export default withRouter(Player);
