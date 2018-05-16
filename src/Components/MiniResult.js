import React from 'react';
import { withRouter } from 'react-router-dom';
import { navTo } from './utils';

const MiniResult = props => {
  let { imdbData, updateMovie, history } = props;

  const navSelect = async () => {
    let movie = await updateMovie(movie.filePath, imdbData);
    navTo(`/${movie.imdbid}/`, history);
  };

  return (
    <div className="mini-movie-container">
      <div onClick={() => navSelect()}>
        <img
          className="mini-movie-image"
          src={`http://${ip}/${movie.fileName}-poster.jpg`}
          alt="No Image Found :("
        />
      </div>
    </div>
  );
};
export default withRouter(MiniResult);
