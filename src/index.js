import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Router } from 'react-router-dom';
import './Style/index.css';
import history from './history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <Router history={history}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);
