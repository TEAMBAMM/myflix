import React from 'react';

const VideoControls = ({
  playPause,
  onClickFullscreen,
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
  ip
}) => {
  const ip_ = ip ? ip : 'localhost';
  return (
    <div className="controls">
      <div className="progress-bar">
        <progress max={1} value={played} width="100%" />
      </div>
      <div className="play-layer">
        <div className="back" onClick={back}>
          <img src={`http://${ip_}/back.png`} width="30" height="30" alt="" />
        </div>
        <div className="center">
          <div className="playPauseBtn" onClick={playPause}>
            {playing ? (
              <img
                src={`http://${ip_}/pause.png`}
                width="30"
                height="30"
                alt=""
              />
            ) : (
              <img
                src={`http://${ip_}/play.png`}
                width="30"
                height="30"
                alt=""
              />
            )}
          </div>
        </div>
        <div className="forward" onClick={forward}>
          <img
            src={`http://${ip_}/forward.png`}
            width="30"
            height="30"
            alt=""
          />
        </div>
      </div>
      <div className="volume-layer">
        <div className="volcon">
          <img
            src={`http://${ip_}/low-volume.png`}
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
            src={`http://${ip_}/high-volume-outline.png`}
            width="20"
            height="20"
            alt=""
            onClick={increaseVolume}
          />
          <div className="muted" onClick={toggleMuted}>
            {
              <img
                src={`http://${ip_}/mute-volume.png`}
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
          src={`http://${ip_}/fullscreen.png`}
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
