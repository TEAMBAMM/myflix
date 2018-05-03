import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Router } from 'react-router-dom';
import './Style/index.css';

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
