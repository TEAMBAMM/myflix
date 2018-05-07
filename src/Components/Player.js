import React from 'react';
import ReactPlayer from 'react-player';

const Player = props => {

  const filename = 'StarWarsTheLastJedi.mp4'

  return (
    <div className="player-container">
      <ReactPlayer url={`http://192.168.1.12:80/${filename}`} controls={true} volume={1} muted={true} playing/>
    </div>
  );
};

export default Player
