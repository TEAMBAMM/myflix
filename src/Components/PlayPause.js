import React from 'react'
import AvFastForward from 'material-ui/svg-icons/av/fast-forward'
import AvFastRewind from 'material-ui/svg-icons/av/fast-rewind'
import AvPause from 'material-ui/svg-icons/av/pause'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'

const PlayPause = props => {
  const width = 20, height = 20;
  const { playPause, back, forward, playing } = props;
  return (
    <div className="play-layer">
      <AvFastRewind style={{ width, height }} color="white" onClick={back} className="icon" />
      <div className="playPauseBtn" onClick={playPause}>
        {playing ? (
          <AvPause style={{ width, height }} color="white" className="icon" />
        ) : (
            <AvPlayArrow style={{ width, height }} color="white" className="icon" />
          )}
      </div>
      <AvFastForward style={{ width, height }} color="white" onClick={forward} />
    </div>
  )
}

export default PlayPause;
