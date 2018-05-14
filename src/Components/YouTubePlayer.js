import React from 'react'
import ReactPlayer from 'react-player'
import { withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { navTo } from './utils'

const style = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center'
}

const YouTubePlayer = props => {

  const { selectedMovie, history } = props
  const url = `https://www.youtube.com/watch?v=${props.match.params.id}`

  return (
    <div>
      <div style={style}>
        <ReactPlayer 
          url={url}
          width='950px'
          height='550px'
          playing={true}
        />
      </div>
      <div style={{...style, margin: '10px'}}>
        <RaisedButton label="Back To Movie" onClick={() => navTo(`/${selectedMovie.imdbid}/`, history)}/>
      </div>
    </div>
  )
}

export default withRouter(YouTubePlayer)