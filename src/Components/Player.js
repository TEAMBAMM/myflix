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
      controlsDisplay: ''
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
    this.forward = this.forward.bind(this);
    this.back = this.back.bind(this);
    this.increaseVolume = this.increaseVolume.bind(this);
    this.decreaseVolume = this.decreaseVolume.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    const movie = this.props.movies.filter(
      movie => this.props.match.params.id === movie.imdbid
    )[0];

    //  'Den of Thieves'
    const fileName = movie.fileName;

    // Right now ip is just of your local machine - need to figure out
    // how to pass correct ip if file is on another machine
    const ip = this.props.ip;

    // 'Den of Thieves.mkv'
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

  forward() {
    if (this.state.played + 0.1 <= 1 && this.state.playbackRate + 0.5 <= 2) {
      this.setState({
        played: this.state.played + 0.1,
        setPlaybackRate: this.state.playbackRate + 0.5
      });
    }
  }

  back() {
    if (this.state.played - 0.1 >= 0 && this.state.playbackRate - 0.5 >= 0) {
      this.setState({
        played: this.state.played - 0.1,
        setPlaybackRate: this.state.playbackRate - 0.5
      });
    }
  }

  decreaseVolume() {
    if (this.state.volume - 0.1 >= 0) {
      console.log('onDecreaseVolume');
      this.setState({
        volume: this.state.volume - 0.1
      });
    }
  }

  increaseVolume() {
    if (this.state.volume + 0.1 <= 1) {
      console.log('onIncreaseVolume');
      this.setState({
        volume: this.state.volume + 0.1
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

  onMouseOver() {
    setTimeout(() => {
      this.setState({
        controlsDisplay: 'invisible'
      });
    }, 5000);
  }

  onMouseMove() {
    this.setState({
      controlsDisplay: 'visible'
    });
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
      <div
        className="player-container"
        onMouseOver={this.onMouseOver}
        onMouseMove={this.onMouseMove}
      >
        <div className="player-overlay">
          <ReactPlayer
            ref={this.ref}
            className="react-player"
            width="100%"
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
          <div className={`controls-overlay ${this.state.controlsDisplay}`}>
            <VideoControls
              playPause={this.playPause}
              onClickFullscreen={this.onClickFullscreen}
              setPlaybackRate={this.setPlaybackRate}
              onSeekMouseDown={this.onSeekMouseDown}
              onSeekChange={this.onSeekChange}
              onSeekMouseUp={this.onSeekMouseUp}
              volume={volume}
              muted={muted}
              toggleMuted={this.toggleMuted}
              played={played}
              loaded={loaded}
              playing={playing}
              back={this.back}
              forward={this.forward}
              decreaseVolume={this.decreaseVolume}
              increaseVolume={this.increaseVolume}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Player);
