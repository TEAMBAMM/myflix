import React from 'react';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import Duration from './Duration';
import VideoControls from './VideoControls';

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
      playbackRate: 1.0,
      elapsed: 0
    };
    this.playPause = this.playPause.bind(this);
    this.onClickFullscreen = this.onClickFullscreen.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekChange = this.onSeekChange.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.toggleMuted = this.toggleMuted.bind(this);
    this.onDuration = this.onDuration.bind(this);
    this.ref = this.ref.bind(this);
    this.forward = this.forward.bind(this);
    this.back = this.back.bind(this);
    this.increaseVolume = this.increaseVolume.bind(this);
    this.decreaseVolume = this.decreaseVolume.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
    const { movies, match } = this.props;
    const movie = movies.filter(movie => match.params.id === movie.imdbid)[0];
    const fileName = movie.fileName;

    // Right now ip is just of your local machine - need to figure out
    // how to pass correct ip if file is on another machine
    const ip = movie.ip ? movie.ip : 'localhost';

    const baseFileName = movie.baseFileName;

    this.setState({
      url: `http://${ip}/${baseFileName}`,
      playing: true,
      muted: false
    });
  }

  playPause() {
    this.setState({
      playing: !this.state.playing
    });
  }

  onClickFullscreen() {
    screenfull.request(findDOMNode(this.player));
  }

  setVolume(e) {
    this.setState({ volume: parseFloat(e.target.value) });
  }

  forward() {
    const playedIncrement = 0.01;
    if (this.state.played + playedIncrement <= 1) {
      this.player.seekTo(this.state.played + playedIncrement);
    }
  }

  back() {
    const playedIncrement = 0.01;
    if (this.state.played - playedIncrement >= 0) {
      this.player.seekTo(this.state.played - playedIncrement);
    }
  }

  decreaseVolume() {
    const volumeIncrement = 0.01;
    if (this.state.volume - volumeIncrement >= 0) {
      this.setState({
        volume: this.state.volume - volumeIncrement
      });
    }
  }

  increaseVolume() {
    const volumeIncrement = 0.01;
    if (this.state.volume + volumeIncrement <= 1) {
      this.setState({
        volume: this.state.volume + volumeIncrement
      });
    }
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

  // We need this function, don't remove it!  Without this, the back and forward buttons will not work. Also, if the seekTo function (built in for ReactPlayer component) is not active (turns this.state.seeking on), setting of state is not happening. So I don't think this is the reason for the memory leak.
  onProgress(state) {
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
    const { ip } = this.props;

    return (
      <div className="player-container">
        <div className="player-overlay">
          <ReactPlayer
            ref={this.ref}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            playing={playing}
            muted={muted}
            volume={volume}
            onSeek={e => console.log('onSeek', e)}
            onError={e => console.log('onError', e)}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
            onClick={this.playPause}
          />
          <VideoControls
            playPause={this.playPause}
            onClickFullscreen={this.onClickFullscreen}
            onSeekMouseDown={this.onSeekMouseDown}
            onSeekChange={this.onSeekChange}
            onSeekMouseUp={this.onSeekMouseUp}
            volume={volume}
            muted={muted}
            toggleMuted={this.toggleMuted}
            played={played}
            playing={playing}
            back={this.back}
            forward={this.forward}
            decreaseVolume={this.decreaseVolume}
            increaseVolume={this.increaseVolume}
            ip={ip}
            duration={duration}
            setVolume={this.setVolume}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Player);
