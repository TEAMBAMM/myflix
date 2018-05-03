import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const MiniMovie = props => {
  return (
    <div className="mini-movie-container">
      <div className="mini-movie-image">
        <Router>
          <Link to={`/movies/${props.title}`}>
            <img src={props.image} alt="test movie image" />
            {/* <img src="../Style/images/play.png" /> */}
          </Link>
        </Router>
      </div>
    </div>
  );
};
export default MiniMovie;
