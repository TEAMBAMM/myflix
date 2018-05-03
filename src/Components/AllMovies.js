import React from 'react';
import MiniMovie from './MiniMovie';

const AllMovies = props => {
  return (
    <div className="all-movies-view-container">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1].map(elem => {
        return <MiniMovie />;
      })}
    </div>
  );
};

export default AllMovies;
