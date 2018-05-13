import React from 'react'
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up'
import AvVolumeDown from 'material-ui/svg-icons/av/volume-down'
import AvVolumeMute from 'material-ui/svg-icons/av/volume-mute'

const Volume = props => {
  const width = 20, height = 20;
  const { volume, setVolume, fullVolume, zeroVolume } = props
  return (
    <div className="volume-layer">
      <AvVolumeDown style={{ width, height }} color="white" onClick={zeroVolume} />
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={volume}
        onChange={setVolume}
      />
      <AvVolumeUp style={{ width, height }} color="white" onClick={fullVolume} />
    </div>
  )
}


export default Volume;
