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
    <div className="table">
      <table>
        <tbody>
          <tr>
            <th>Controls</th>
            <td>
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
            </td>
          </tr>
          <tr>
            <th>Seek</th>
            <td>
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
            </td>
          </tr>
          <tr>
            <th>Volume</th>
            <td>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                defaultValue={volume}
                onChange={setVolume}
              />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="muted">Muted</label>
            </th>
            <td>
              <input
                id="muted"
                type="checkbox"
                checked={muted}
                onChange={toggleMuted}
              />
            </td>
          </tr>
          <tr>
            <th>Played</th>
            <td>
              <progress max={1} defaultValue={played} />
            </td>
          </tr>
          <tr>
            <th>Loaded</th>
            <td>
              <progress max={1} defaultValue={loaded} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VideoControls;
