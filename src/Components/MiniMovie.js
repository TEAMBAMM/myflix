import React from 'react';
import { withRouter } from 'react-router-dom';
import { navTo } from './utils';
import Paper from 'material-ui/Paper'

const MiniMovie = props => {
  const { movie, selectMovie, history } = props;
  const ip = (movie.ip) ? movie.ip : 'localhost';

  const navSelect = () => {
    selectMovie(movie);
    navTo(`/${movie.imdbid}/`, history);
  };

  const style = {
    paddingTop: 3,
    height: 426,
    width: 302,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <div className="mini-movie-container">
      <Paper style={style} zDepth={3} >
        <div>
          <img
            onClick={() => navSelect()}
            className="mini-movie-image"
            src={`http://${ip}/${movie.fileName}-poster.jpg`}
            alt="No Image Found :("
          />
        </div>
      </Paper>
    </div>
  );
};
export default withRouter(MiniMovie);
