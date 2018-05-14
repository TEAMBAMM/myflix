import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import { navTo } from './utils'
import YouTube from 'simple-youtube-api'
const youtube = new YouTube('AIzaSyC_A8s39eR1hrySfCTTMoMYS8AaTOnfiKY')

class PlayTrailer extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      youTubeId: ''
    
    }
  }

  componentDidMount() {
    youtube.searchVideos(`${this.props.movie.title} trailer`, 1)
      .then(result => {
        this.setState({...this.state, youTubeId: result[0].id})
      }) 
  }

  render() {

    const { youTubeId } = this.state
    const { history } = this.props

    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', marginTop: '10px', maxWidth: '120px'}} onClick={() => navTo(`/${youTubeId}/youtubeplayer/`, history)}>
          <PlayArrow style={{marginRight: '4px', marginBottom: '2px'}}/>
          <span>Play Trailer</span>
        </div>
      </div>
    )
  }
}


export default withRouter(PlayTrailer);