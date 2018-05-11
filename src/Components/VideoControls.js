import React from 'react';
import { precisionRound } from './utils'

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
  setVolume,
  playing,
  forward,
  back,
  increaseVolume,
  decreaseVolume,
  ip,
  duration
}) => {
  const ip_ = ip ? ip : 'localhost';
  return (
    <div className="controls">
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
        <span>{precisionRound(duration * played, 2)}</span>
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
        <div className="trio">
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
            value={volume}
            onChange={setVolume}
          />
          <img
            src={`http://${ip_}/high-volume-outline.png`}
            width="20"
            height="20"
            alt=""
            onClick={increaseVolume}
          />
        </div>

        <div className="fullscreen">
          <img
            src={`http://${ip_}/fullscreen.png`}
            width="25"
            height="25"
            alt=""
            onClick={onClickFullscreen}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
