import React from 'react';
import play from '../../build/images/play.png';
import pause from '../../build/images/pause.png';
import fullscreen from '../../build/images/fullscreen.png';
import mute from '../../build/images/mute.png';
import back from '../../build/images/back.png';
import forward from '../../build/images/forward.png';

const VideoControls = ({
  playPause,
  onClickFullscreen,
  setPlaybackRate,
  onSeekMouseDown,
  onSeekChange,
  onSeekMouseUp,
  volume,
  muted,
  toggleMuted,
  played,
  loaded,
  setVolume,
  playing
}) => {
  return (
    <div className="controls">
      <div className="progress-bar">
        <progress max={1} value={played} width="100%" />
      </div>
      <div className="first-layer">
        <div className="right">
          <div className="playPauseBtn" onClick={playPause}>
            {playing ? (
              <img src={pause} width="30" height="30" alt="" />
            ) : (
              <img src={play} width="30" height="30" alt="" />
            )}
          </div>
        </div>
        <div className="left" onClick={onClickFullscreen}>
          {<img src={fullscreen} width="30" height="30" alt="" />}
        </div>
      </div>
      <div className="second-layer">
        <div>
          <div>Seek</div>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            defaultValue={played}
            onMouseDown={onSeekMouseDown}
            onChange={onSeekChange}
            onMouseUp={onSeekMouseUp}
          />
        </div>

        <div>
          <div>Volume</div>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            defaultValue={volume}
            onChange={setVolume}
          />
        </div>
        <div className="muted" onClick={toggleMuted}>
          {<img src={mute} width="30" height="30" alt="" />}
        </div>
      </div>
    </div>
  );
};

export default VideoControls;

/* <div onClick={setPlaybackRate} value={1}>
          1
        </div>
        <div onClick={setPlaybackRate} value={1.5}>
          1.5
        </div>
        <div onClick={setPlaybackRate} value={2}>
          2
        </div>
        <div>Loaded</div>
      <div>
        <progress max={1} defaultValue={loaded} />
      </div>
        */
