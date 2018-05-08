import React, { Component } from 'react'
import { Router, Route, withRouter } from 'react-router-dom'
import NavBar from './NavBar'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Player from './Player'
import axios from 'axios'
import AllMovies from './AllMovies'
import MiniMovie from './MiniMovie'
import SingleMovie from './SingleMovie'
import movieArray from '../../data/movieArray'

injectTapEventPlugin()

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: {},
      searchInput: '',
      isPlaying: false,
      filter: 'all',
      sort: 'dateAdded',
      currentMoviePosition: '',
      favorites: false
    };
    this.onChange = this.onChange.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
  }

  componentDidMount() {
    
    this.setState({...this.state, movies: movieArray})
  }

  async toggleFavorites(event) {
    const res = await axios.get(`http://localhost/api/devices`)
    console.log(res.data)
    // const value = event.target.value;
    // this.setState({ ...this.state, favorites: !this.state.favorites });
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({ ...this.state, searchInput: value });
  }

  changeFilter(event) {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ ...this.state, filter: value });
  }

  changeSort(event) {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ ...this.state, sort: value });
  }

  render() {

    const { filter, sort, searchInput, favorites, movies } = this.state;
    const { onChange, changeFilter, changeSort, toggleFavorites } = this;

    return (
      <div>
        <NavBar
          onChange={onChange}
          changeFilter={changeFilter}
          changeSort={changeSort}
          filter={filter}
          sort={sort}
          searchInput={searchInput}
          toggleFavorites={toggleFavorites}
          favorites={favorites}
          movies={movies}
        />
        <Route exact path='*index.html' render={() => <AllMovies movies={movies}/>} />
        <Route exact path='/:id/' render={() => <SingleMovie movies={movies}/>} />
        
      </div>
    );
  }
}

export default withRouter(App);
