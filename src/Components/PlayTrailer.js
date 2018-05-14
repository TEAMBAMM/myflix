import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom'

const style = {
  margin: 0,
};

const PlayTrailer = props => {

  return (
    <div>
      <RaisedButton label="Play Trailer" style={style} />
    </div>
  )
}


export default withRouter(PlayTrailer);