import React from 'react';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom';
import screenfull from 'screenfull';

// variables for dummy data only, change when actual database is used
// const { movies } = this.props;
// const imdbid = this.props.match.params.id;
// const movie = movies.filter(movie => imdbid === movie.imdbid)[0];
// const movieUrl = movie.videoplayer;
// // const filename = 'StarWarsTheLastJedi.mp4';  // for testing by Blake
// // const ip = '192.168.1.12:80' // from Blake
// const filename = 'farm_thxgvg_2017.mp4'; // only for testing by Alona
// const ip = '192.168.0.7'; // only for testing by Alona
// const url = `http://${ip}/${filename}`;

class Player extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     url: null,
  //     playing: true,
  //     volume: 0.5,
  //     muted: true,
  //     played: 0,
  //     loaded: 0,
  //     duration: 0,
  //     playbackRate: 1.0,
  //     loop: false
  //   };
  // }

  // load(url) {
  //   this.setState({
  //     url,
  //     played: 0,
  //     loaded: 0
  //   });
  // }

  // playPause() {
  //   this.setState({
  //     playing: !this.state.playing
  //   });
  // }

  // setVolume(event) {
  //   this.setState({
  //     volume: parseFloat(event.target.value)
  //   });
  // }

  // toggleMuted() {
  //   this.setState({
  //     muted: !this.state.muted
  //   });
  // }

  // setPlaybackRate(event) {
  //   this.setState({
  //     playbackRate: parseFloat(event.target.value)
  //   });
  // }

  // onPlay() {
  //   console.log('onPlay');
  //   this.setState({
  //     playing: true
  //   });
  // }

  // onPause() {
  //   console.log('onPause');
  //   this.setState({
  //     playing: false
  //   });
  // }

  // onSeekMouseDown(e) {
  //   this.setState({
  //     seeking: true
  //   });
  // }

  // onSeekChange(e) {
  //   this.setState({
  //     played: parseFloat(e.target.value)
  //   });
  // }

  // onSeekMouseUp(e) {
  //   this.setState({
  //     seeking: false
  //   });
  //   this.player.seekTo(parseFloat(e.target.value));
  // }

  // onProgress(state) {
  //   console.log('onProgress', state);
  //   // We only want to update time slider if we are not currently seeking
  //   if (!this.state.seeking) {
  //     this.setState(state);
  //   }
  // }

  // onEnded() {
  //   console.log('onEnded');
  //   this.setState({
  //     playing: this.state.loop
  //   });
  // }

  // onDuration(duration) {
  //   console.log('onDuration', duration);
  //   this.setState({ duration });
  // }

  // onClickFullscreen() {
  //   screenfull.request(findDOMNode(this.player));
  // }

  // renderLoadButton(url, label) {
  //   return <button onClick={() => this.load(url)}>{label}</button>;
  // }

  // ref(player) {
  //   this.player = player;
  // }

  render() {
    // variables needed for actual playing
    // const {
    //   // url
    //   playing,
    //   volume,
    //   muted,
    //   loop,
    //   played,
    //   loaded,
    //   duration,
    //   playbackRate
    // } = this.state;
    // const SEPARATOR = ' . ';

    const { movies } = this.props;
    const imdbid = this.props.match.params.id;
    const movie = movies.filter(movie => imdbid === movie.imdbid)[0];
    const movieUrl = movie.videoplayer;
    // const filename = 'StarWarsTheLastJedi.mp4';  // for testing by Blake
    // const ip = '192.168.1.12:80' // from Blake
    const filename = 'farm_thxgvg_2017.mp4'; // only for testing by Alona
    const ip = '192.168.0.7'; // only for testing by Alona
    const url = `http://${ip}/${filename}`;
    return (
      <div className="player-container">
        <div className="player-overlay">
          <a href="#">
            <ReactPlayer
              // ref={this.ref}
              url={url}
              // volume={volume}
              // muted={muted}
              // playing
              // className="react-player"
              // onReady={() => console.log('onReady')}
              // onStart={() => console.log('onStart')}
              // onPlay={this.onPlay}
              // onPause={this.onPause}
              // onBuffer={() => console.log('onBuffer')}
              // onSeek={e => console.log('onSeek', e)}
              // onEnded={this.onEnded}
              // onError={e => console.log('onError', e)}
              // onProgress={this.onProgress}
              // onDuration={this.onDuration}
              controls={true}
              width="100%" // cannot be put on css, must be in here, I found
              height="100%"
            />
          </a>
          {/* <a href="#" className="controlWrapper">
            <span className="controlBtns">
              <div className="center-controls">
                <button>Back</button>
                <button>FastBack</button>
                <button onClick={() => this.playPause}>
                  {playing ? 'Pause' : 'Play'}
                </button>
                <button>FastForward</button>
                <button>Forward</button>
              </div>
              <div className="left-controls">
                <button onClick={this.onClickFullscreen}>Fullscreen</button>
              </div>
            </span>
          </a> */}
        </div>
      </div>
    );
  }
}

export default withRouter(Player);
