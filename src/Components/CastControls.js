import React from 'react'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Pause from 'material-ui/svg-icons/av/pause'
import Stop from 'material-ui/svg-icons/av/stop'
import Rewind from 'material-ui/svg-icons/av/fast-rewind'
import Forward from 'material-ui/svg-icons/av/fast-forward'
import axios from 'axios'

const CastControls = props => {

  const { toggleCasting } = props

  const control = async (event) => {
    const command = event.currentTarget.id
    if(command === 'stop') toggleCasting(false)
    const res = await axios.put(`http://localhost/api/cast/${command}`)
  }

  const style = {
    marginTop: 6,
  }

  return (
    <div>
      <IconButton style={style} id='rewind' onClick={control}>
        <Rewind />
      </IconButton>
      <IconButton style={style} id='stop' onClick={control}>
        <Stop />
      </IconButton>
      <IconButton style={style} id='pause' onClick={control}>
        <Pause />
      </IconButton>
      <IconButton style={style} id='play' onClick={control}>
        <PlayArrow />
      </IconButton>
      <IconButton style={style} id='forward' onClick={control}>
        <Forward />
      </IconButton>

    </div>      
  )
}

export default CastControls