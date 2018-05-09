import React from 'react';
import play from '../../build/images/play.png';
import pause from '../../build/images/pause.png';
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
      <div className="playPauseBtn" onClick={playPause}>
        {playing ? (
          <img src={pause} width="50" height="50" alt="" />
        ) : (
          <img src={play} width="50" height="50" alt="" />
        )}
      </div>
      <div onClick={onClickFullscreen}>Fullscreen</div>
      <div onClick={setPlaybackRate} value={1}>
        1
      </div>
      <div onClick={setPlaybackRate} value={1.5}>
        1.5
      </div>
      <div onClick={setPlaybackRate} value={2}>
        2
      </div>

      <div>Seek</div>
      <div>
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

      <div>Volume</div>
      <div>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          defaultValue={volume}
          onChange={setVolume}
        />
      </div>
      <div>
        <label htmlFor="muted">Muted</label>
      </div>
      <div>
        <input
          id="muted"
          type="checkbox"
          checked={muted}
          onChange={toggleMuted}
        />
      </div>
      <div>Played</div>
      <div>
        <progress max={1} defaultValue={played} />
      </div>

      <div>Loaded</div>
      <div>
        <progress max={1} defaultValue={loaded} />
      </div>
    </div>
  );
};

export default VideoControls;
