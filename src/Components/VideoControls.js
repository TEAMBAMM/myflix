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
      <button onClick={playPause}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={onClickFullscreen}>Fullscreen</button>
      <button onClick={setPlaybackRate} value={1}>
        1
      </button>
      <button onClick={setPlaybackRate} value={1.5}>
        1.5
      </button>
      <button onClick={setPlaybackRate} value={2}>
        2
      </button>

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
