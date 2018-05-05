import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom'

const style = {
  margin: 0,
};

const Home = props => {

  return (
    <div>
      <RaisedButton label="Home" style={style} />
    </div>
  )
}


export default withRouter(Home);