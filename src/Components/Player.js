import React from 'react';
import ReactPlayer from 'react-player';

const Player = props => {
  return (
    <div className="player-container">
      <ReactPlayer url={props.movieUrl} playing />
    </div>
  );
};
