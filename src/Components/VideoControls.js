import React from 'react';
import { precisionRound } from './utils'
import AvFastForward from 'material-ui/svg-icons/av/fast-forward'
import AvFastRewind from 'material-ui/svg-icons/av/fast-rewind'
import AvPause from 'material-ui/svg-icons/av/pause'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import NavigationFullscreen from 'material-ui/svg-icons/navigation/fullscreen'
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up'
import AvVolumeDown from 'material-ui/svg-icons/av/volume-down'
import AvVolumeMute from 'material-ui/svg-icons/av/volume-mute'


const VideoControls = (props) => {
  const {
    playPause,
    onClickFullscreen,
    onSeekMouseDown,
    onSeekChange,
    onSeekMouseUp,
    volume,
    muted,
    toggleMuted,
    played,
    setVolume,
    playing,
    forward,
    back,
    increaseVolume,
    decreaseVolume,
    ip,
    duration
  } = props
  const elapsed = precisionRound(((duration * played) / duration) * 100, 2)
  const width = 20, height = 20;
  return (
    <div className="controls controls-overlay">
      <div className="progress-bar">
        <input
          className="seekbar"
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onMouseDown={onSeekMouseDown}
          onChange={onSeekChange}
          onMouseUp={onSeekMouseUp}
        />
        <span>{String(elapsed)}</span>
      </div>
      <div className="play-layer">
        <AvFastRewind style={{ width, height }} color="white" onClick={back} />
        <div className="center">
          <div className="playPauseBtn" onClick={playPause}>
            {playing ? (
              <AvPause style={{ width, height }} color="white" />
            ) : (
                <AvPlayArrow style={{ width, height }} color="white" />
              )}
          </div>
        </div>
        <AvFastForward style={{ width, height }} color="white" onClick={forward} />
      </div>
      <div className="volume-layer">
        <AvVolumeMute style={{ width, height }} color="white" onClick={toggleMuted} />
        <div className="trio">
          <AvVolumeDown style={{ width, height }} color="white" onClick={decreaseVolume} />
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={setVolume}
          />
          <AvVolumeUp style={{ width, height }} color="white" onClick={increaseVolume} />
        </div>
        <NavigationFullscreen style={{ width, height }} color="white" onClick={onClickFullscreen} />
      </div>
    </div>
  );
};

export default VideoControls;
