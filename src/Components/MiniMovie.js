import React from 'react';
import { withRouter } from 'react-router-dom';
import { navTo } from './utils'

const MiniMovie = props => {

  const { imdbid, fileName, history } = props

  return (
    <div className="mini-movie-container">
      <div>
        <img onClick={() => navTo(`/${imdbid}/`, history)}
          className='mini-movie-image' src={`http://localhost/${fileName}-poster.jpg`} alt="No Image Found :(" />
      </div>
    </div>
  );
};
export default withRouter(MiniMovie);
