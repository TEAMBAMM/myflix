import React from 'react';
import Volume from './Volume'
import ProgressBar from './ProgressBar'
import NavigationFullscreen from 'material-ui/svg-icons/navigation/fullscreen'
import PlayPause from './PlayPause'


const VideoControls = (props) => {
  const {
    playPause,
    onClickFullscreen,
    onSeekMouseDown,
    onSeekChange,
    onSeekMouseUp,
    volume,
    played,
    setVolume,
    playing,
    forward,
    back,
    duration,
    zeroVolume,
    fullVolume,
    shouldHide
  } = props
  const width = 25, height = 25;
  return (
    <div className={shouldHide ? "hidden" : "none"}>
      <div className="controls-overlay">
        <div className="main">
          <Volume volume={volume} setVolume={setVolume} zeroVolume={zeroVolume} fullVolume={fullVolume} />
          <PlayPause playPause={playPause} back={back} forward={forward} playing={playing} />
          <NavigationFullscreen style={{ width, height }} color="white" onClick={onClickFullscreen} />
        </div>
        <ProgressBar played={played} onSeekChange={onSeekChange} onSeekMouseDown={onSeekMouseDown} onSeekMouseUp={onSeekMouseUp} duration={duration} />
      </div>
    </div>
  );
};

export default VideoControls;
