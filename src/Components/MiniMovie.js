import React from 'react';
import { withRouter } from 'react-router-dom';
import { navTo } from './utils'

const MiniMovie = props => {

  const { imdbid, image, history } = props

  return (
    <div className="mini-movie-container">
      <div>
        <img onClick={() => navTo(`/${imdbid}/`, history)}
          className='mini-movie-image' src={image} alt="test movie image" />
      </div>
    </div>
  );
};
export default withRouter(MiniMovie);
