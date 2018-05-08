import React from 'react';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import Duration from './Duration';
import FlatButton from 'material-ui/FlatButton';

// const filename = 'StarWarsTheLastJedi.mp4';  // for testing by Blake
// const ip = '192.168.1.12:80' // from Blake

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      url: null,
      playing: false,
      muted: true,
      volume: 0.5,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0
    };
    this.playPause = this.playPause.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onClickFullscreen = this.onClickFullscreen.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.setPlaybackRate = this.setPlaybackRate.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekChange = this.onSeekChange.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.toggleMuted = this.toggleMuted.bind(this);
    this.onDuration = this.onDuration.bind(this);
    this.ref = this.ref.bind(this);
    this.onEnded = this.onEnded.bind(this);
  }

  componentDidMount() {
    // dummy data
    const movieUrl = this.props.movies.filter(
      movie => this.props.match.params.id === movie.imdbid
    )[0].videoplayer;

    const filename = 'farm_thxgvg_2017.mp4'; // only for testing by Alona
    const ip = '192.168.0.7'; // only for testing by Alona
    const tempUrl = `http://${ip}/${filename}`;

    this.setState({
      url: tempUrl,
      playing: true,
      muted: false
    });
  }

  playPause() {
    this.setState({
      playing: !this.state.playing
    });
    console.log(this.state.playing);
  }

  onPlay() {
    console.log('onPlay');
    this.setState({
      playing: true
    });
  }

  onPause() {
    console.log('onPause');
    this.setState({
      playing: false
    });
  }

  onClickFullscreen() {
    screenfull.request(findDOMNode(this.player));
  }

  setVolume(e) {
    this.setState({ volume: parseFloat(e.target.value) });
  }

  setPlaybackRate(e) {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  }

  onSeekMouseDown(e) {
    this.setState({ seeking: true });
  }
  onSeekChange(e) {
    this.setState({ played: parseFloat(e.target.value) });
  }
  onSeekMouseUp(e) {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  }
  onProgress(state) {
    console.log('onProgress', state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  }
  toggleMuted() {
    this.setState({ muted: !this.state.muted });
  }

  onDuration(duration) {
    console.log('onDuration', duration);
    this.setState({ duration });
  }

  onEnded() {
    console.log('onEnded');
    this.setState({ playing: this.state.loop });
  }

  ref(player) {
    this.player = player;
  }

  render() {
    const {
      url,
      playing,
      muted,
      volume,
      played,
      loaded,
      duration,
      playbackRate
    } = this.state;

    return (
      <div className="player-container">
        <div className="player-overlay">
          <a href="#">
            <ReactPlayer
              className="react-player"
              width="100%" // cannot be put on css, must be in here, I found
              height="100%"
              url={url}
              playing={playing}
              onPlay={this.onPlay}
              onPause={this.onPause}
              muted={muted}
              volume={volume}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.onEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
            />
          </a>
          {/*
          Attempt at doing hovering css futile for now
          <a href="#" className="controlWrapper">
            <span className="controlBtns">
              <div className="center-controls">
                <button onClick={() => this.playPause()}>
                  {playing ? 'Pause' : 'Play'}
                </button>
              </div>
              <div className="left-controls">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={() => this.setVolume()}
                />
                <button onClick={this.onClickFullscreen}>Fullscreen</button>
              </div>
            </span>
          </a> */}

          <div className="table">
            <table>
              <tbody>
                <tr>
                  <th>Controls</th>
                  <td>
                    <button onClick={this.playPause}>
                      {playing ? 'Pause' : 'Play'}
                    </button>
                    <button onClick={this.onClickFullscreen}>Fullscreen</button>
                    <button onClick={this.setPlaybackRate} value={1}>
                      1
                    </button>
                    <button onClick={this.setPlaybackRate} value={1.5}>
                      1.5
                    </button>
                    <button onClick={this.setPlaybackRate} value={2}>
                      2
                    </button>
                  </td>
                </tr>
                <tr>
                  <th>Seek</th>
                  <td>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      value={played}
                      onMouseDown={this.onSeekMouseDown}
                      onChange={this.onSeekChange}
                      onMouseUp={this.onSeekMouseUp}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Volume</th>
                  <td>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      value={volume}
                      onChange={this.setVolume}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="muted">Muted</label>
                  </th>
                  <td>
                    <input
                      id="muted"
                      type="checkbox"
                      checked={muted}
                      onChange={this.toggleMuted}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Played</th>
                  <td>
                    <progress max={1} value={played} />
                  </td>
                </tr>
                <tr>
                  <th>Loaded</th>
                  <td>
                    <progress max={1} value={loaded} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Player);
