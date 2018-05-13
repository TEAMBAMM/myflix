import React from 'react'
import Duration from './Duration'

const ProgressBar = props => {
  const { played, onSeekChange, onSeekMouseDown, onSeekMouseUp, duration } = props;
  return (
    <div className="progress-bar">
      <Duration seconds={duration * played} />
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
      <Duration seconds={duration * (1 - played)} />
    </div>
  )
}

export default ProgressBar;
