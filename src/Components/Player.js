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
      elapsed: 0,
      shouldHide: false
    };
    this.playPause = this.playPause.bind(this);
    this.onClickFullscreen = this.onClickFullscreen.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekChange = this.onSeekChange.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onDuration = this.onDuration.bind(this);
    this.ref = this.ref.bind(this);
    this.forward = this.forward.bind(this);
    this.back = this.back.bind(this);
    this.zeroVolume = this.zeroVolume.bind(this)
    this.fullVolume = this.fullVolume.bind(this)
    this.timerId = null;
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentDidMount() {
    const { movies, match } = this.props;
    const movie = movies.filter(movie => match.params.id === movie.imdbid)[0];
    const fileName = movie.fileName;

    const ip = (movie.ip) ? movie.ip : 'localhost';

    const baseFileName = movie.baseFileName;

    this.setState({
      url: `http://${ip}/${baseFileName}`,
      playing: true,
      muted: false
    });

    this.timerId = setTimeout(() => {
      this.setState({ shouldHide: true })
    }, 3000)

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

  zeroVolume() {
    this.setState({
      volume: 0
    })
  }

  fullVolume() {
    this.setState({
      volume: 1
    })
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
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  onDuration(duration) {
    this.setState({ duration });
  }

  ref(player) {
    this.player = player;
  }

  handleMouseMove() {
    clearTimeout(this.timerId)
    this.setState({
      shouldHide: false
    })
    this.timerId = setTimeout(() => {
      this.setState({ shouldHide: true })
    }, 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
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
      playbackRate,
      shouldHide
    } = this.state;
    const { ip } = this.props;

    return (
      <div className="player-container">
        <div className="player-overlay" onMouseMove={this.handleMouseMove}>
          <ReactPlayer
            ref={this.ref}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            playing={playing}
            muted={muted}
            volume={volume}
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
            played={played}
            playing={playing}
            back={this.back}
            forward={this.forward}
            duration={duration}
            setVolume={this.setVolume}
            fullVolume={this.fullVolume}
            zeroVolume={this.zeroVolume}
            shouldHide={shouldHide}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Player);
