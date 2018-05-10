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
  playing,
  forward,
  back,
  increaseVolume,
  decreaseVolume,
  onSeekMouseUpControl
}) => {
  return (
    <div className="controls">
      <div className="progress-bar">
        <progress max={1} value={played} width="100%" />
      </div>
      <div className="play-layer">
        <div className="back" onClick={back}>
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
        <div className="forward" onClick={forward}>
          <img
            src="http://localhost/forward.png"
            width="30"
            height="30"
            alt=""
          />
        </div>
      </div>
      <div className="volume-layer">
        <div className="volcon">
          <img
            src="http://localhost/low-volume.png"
            width="20"
            height="20"
            alt=""
            onClick={decreaseVolume}
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
            src="http://localhost/high-volume-outline.png"
            width="20"
            height="20"
            alt=""
            onClick={increaseVolume}
          />
          <div className="muted" onClick={toggleMuted}>
            {
              <img
                src="http://localhost/mute-volume.png"
                width="20"
                height="20"
                alt=""
              />
            }
          </div>
        </div>
        <div className="seek">
          <p>Seek</p>
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
        </div>
        <img
          src="http://localhost/fullscreen.png"
          width="25"
          height="25"
          alt=""
          onClick={onClickFullscreen}
        />
      </div>
    </div>
  );
};

export default VideoControls;
