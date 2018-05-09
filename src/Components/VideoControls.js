import React from 'react';

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
              <img
                src="http://localhost/pause.png"
                width="30"
                height="30"
                alt=""
              />
            ) : (
              <img
                src="http://localhost/play.png"
                width="30"
                height="30"
                alt=""
              />
            )}
          </div>
        </div>
        <div className="left" onClick={onClickFullscreen}>
          {
            <img
              src="http://localhost/fullscreen.png"
              width="30"
              height="30"
              alt=""
            />
          }
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
          {
            <img
              src="http://localhost/mute.png"
              width="30"
              height="30"
              alt=""
            />
          }
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
