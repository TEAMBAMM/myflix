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
      <div className="play-layer">
        <div className="back" onClick={setPlaybackRate} value={-2}>
          <img src="http://localhost/back.png" width="30" height="30" alt="" />
        </div>
        <div className="center">
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
        <div className="forward" onClick={setPlaybackRate} value={2}>
          <img
            src="http://localhost/forward.png"
            width="30"
            height="30"
            alt=""
          />
        </div>
      </div>
      <div className="volume-layer">
        <div>
          <img
            src="http://localhost/low_volume.png"
            width="25"
            height="25"
            alt=""
          />
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            defaultValue={volume}
            onChange={setVolume}
          />
          <img
            src="http://localhost/medium_volume.png"
            width="25"
            height="25"
            alt=""
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
        <input
          className="seekbar"
          type="range"
          min={0}
          max={1}
          step="any"
          defaultValue={played}
          onMouseDown={onSeekMouseDown}
          onChange={onSeekChange}
          onMouseUp={onSeekMouseUp}
        />
        <div onClick={onClickFullscreen}>
          {
            <img
              src="http://localhost/fullscreen.png"
              width="25"
              height="25"
              alt=""
            />
          }
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
