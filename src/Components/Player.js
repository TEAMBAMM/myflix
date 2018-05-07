import React from 'react';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom';

const Player = props => {
  console.log(props);
  const { movies } = props;
  const imdbid = props.match.params.id;
  const movie = movies.filter(movie => imdbid === movie.imdbid)[0];
  console.log(movie.videoplayer);
  // const filename = 'StarWarsTheLastJedi.mp4';

  return (
    <div className="player-container">
      <ReactPlayer
        url={movie.videoplayer}
        controls={true}
        volume={1}
        muted={true}
        playing
      />
    </div>
  );
};

export default withRouter(Player);
