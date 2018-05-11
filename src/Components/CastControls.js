import React from 'react'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Pause from 'material-ui/svg-icons/av/pause'
import Stop from 'material-ui/svg-icons/av/stop'
import Rewind from 'material-ui/svg-icons/av/fast-rewind'
import Forward from 'material-ui/svg-icons/av/fast-forward'


const CastControls = props => {

  const style = {
    marginTop: 6,
  }

  return (
    <div>
      <IconButton style={style}>
        <Rewind />
      </IconButton>
      <IconButton style={style}>
        <Stop />
      </IconButton>
      <IconButton style={style}>
        <Pause />
      </IconButton>
      <IconButton style={style}>
        <PlayArrow />
      </IconButton>
      <IconButton style={style}>
        <Forward />
      </IconButton>

    </div>      
  )
}

export default CastControls