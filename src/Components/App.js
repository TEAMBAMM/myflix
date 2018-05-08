import React, { Component } from 'react';
import { Router, Route, withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Player from './Player';
import axios from 'axios';
import AllMovies from './AllMovies';
import MiniMovie from './MiniMovie';
import SingleMovie from './SingleMovie';
import movieArray from '../../data/movieArray';

injectTapEventPlugin();

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: {},
      searchInput: '',
      isPlaying: false,
      filter: 'All',
      sort: 'Title',
      currentMoviePosition: '',
      favorites: false,
      filteredOutput: []
    };
    this.onChange = this.onChange.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
  }

  async componentDidMount() {
    await this.setState({
      ...this.state,
      movies: movieArray,
      filteredOutput: movieArray
    });
    await this.updateSortedList();
  }

  async toggleFavorites(event) {
    const res = await axios.get(`http://localhost/api/devices`);
    console.log(res.data);
    // const value = event.target.value;
    // this.setState({ ...this.state, favorites: !this.state.favorites });
  }

  async onChange(event) {
    const value = event.target.value;
    this.setState({ ...this.state, searchInput: value });
  }

  async changeFilter(event, value) {
    event.preventDefault();
    await this.setState({ ...this.state, filter: value });
    this.updateSortedList();
    console.log(await this.state);
  }

  async changeSort(event, value) {
    event.preventDefault();
    await this.setState({ ...this.state, sort: value });
    this.updateSortedList();
  }

  async updateSortedList() {
    let moviesList = this.state.movies; // movies array from state
    let filterTerm = this.state.filter; // term to sort genre by
    let sortTerm = this.state.sort; // term to sort category by
    let filteredOutput;
    if (filterTerm !== 'All') {
      filteredOutput = moviesList.filter(movie => {
        return movie.genres.includes(filterTerm);
      });
    } else {
      filteredOutput = moviesList;
    }
    switch (sortTerm) {
      case 'Recently Added': // will update later
        break;
      case 'Title':
        filteredOutput.sort((movieA, movieB) => {
          const movieAL = movieA.title.toLowerCase();
          const movieBL = movieB.title.toLowerCase();
          if (movieAL < movieBL) return -1;
          if (movieAL > movieBL) return 1;
          return 0;
        });
        break;
      case 'Rating':
        filteredOutput.sort((movieA, movieB) => {
          return movieB.rating - movieA.rating;
        });
        break;
      case 'Year':
        filteredOutput.sort((movieA, movieB) => {
          return movieB.year - movieA.year;
        });
        break;
      case 'Resolution': // will update later
        break;
    }
    await this.setState({ ...this.state, filteredOutput: filteredOutput });
  }

  render() {
    const {
      filter,
      sort,
      searchInput,
      favorites,
      movies,
      filteredOutput
    } = this.state;
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
        <Route
          exact
          path="*index.html"
          render={() => <AllMovies movies={filteredOutput} />}
        />
        <Route
          exact
          path="/:id/"
          render={() => <SingleMovie movies={movies} />}
        />
      </div>
    );
  }
}

export default withRouter(App);
