import React from 'react';
import { withRouter } from 'react-router-dom';
import { navTo } from './utils'

const MiniMovie = props => {

  const { movie, selectMovie, history } = props
  const ip = (movie.ip) ? movie.ip : 'localhost'

  const navSelect = () => {
    selectMovie(movie)
    navTo(`/${movie.imdbid}/`, history)
  }

  return (
    <div className="mini-movie-container">
      <div>
        <img onClick={() => navSelect() }
          className='mini-movie-image' src={`http://${ip}/${movie.fileName}-poster.jpg`} alt="No Image Found :(" />
      </div>
    </div>
  );
};
export default withRouter(MiniMovie);
