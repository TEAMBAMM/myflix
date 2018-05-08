import React from 'react';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      playing: true,
      volume: 0.5,
      muted: true,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false
    };
  }

  load(url) {
    this.setState({
      url,
      played: 0,
      loaded: 0
    });
  }

  render() {
    const { movies } = this.props;
    const imdbid = this.props.match.params.id;
    const movie = movies.filter(movie => imdbid === movie.imdbid)[0];
    const movieUrl = movie.videoplayer;
    // const filename = 'StarWarsTheLastJedi.mp4';
    const filename = 'farm_thxgvg_2017.mp4';
    const ip = '192.168.0.7';

    return (
      <div className="player-container">
        <div className="player-overlay">
          <a href="#">
            <ReactPlayer
              // url={movieUrl}
              url={`http://${ip}/${filename}`}
              // controls={true}
              // volume={1}
              // muted={true}
              // playing
              className="react-player"
              width="100%"
              height="100%"
            />
          </a>
          <a href="#" className="controlWrapper">
            <span className="controlBtns">
              <div className="center-controls">
                <button>Back</button>
                <button>FastBack</button>
                <button>Play/Stop</button>
                <button>FastForward</button>
                <button>FastForward</button>
              </div>
              <div className="left-controls">
                <button>Fullscreen</button>
              </div>
            </span>
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(Player);
