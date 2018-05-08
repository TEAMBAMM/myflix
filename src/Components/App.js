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
import ip from 'ip'

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
      sort: 'dateAdded',
      currentMoviePosition: '',
      favorites: false,
      filteredOutput: [],
      scanning: false,
      devices: []
    };
    this.onChange = this.onChange.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.deviceScanner = this.deviceScanner.bind(this)
    this.test = this.test.bind(this)
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      movies: movieArray,
      filteredOutput: movieArray
    });
    this.deviceScanner()
  }

  deviceScanner() {
    if(!this.state.scanning) {
      setInterval(async ()=> {
        const res = await axios.get(`http://localhost/api/devices`)
        this.setState({...this.state, devices: res.data, scanning: true})
      }, 5000)
    }
  }

  async test() {
    const res = await axios.put(`http://localhost/api/cast`, {url: `http://192.168.1.5/12.mkv`, name: '12 strong'})
    console.log(res.data)
  }

  async toggleFavorites(event) {
    const value = event.target.value;
    this.setState({ ...this.state, favorites: !this.state.favorites });
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

  changeSort(event) {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ ...this.state, sort: value });
  }

  async updateSortedList() {
    let moviesList = this.state.movies;
    let filter = this.state.filter;
    let filteredOutput;
    if (filter !== 'All') {
      filteredOutput = moviesList.filter(movie => {
        return movie.genres.includes(filter);
      });
    } else {
      filteredOutput = moviesList;
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
    const { onChange, changeFilter, changeSort, toggleFavorites, test } = this;

    return (
      <div>
        <button onClick={() => test()}>TEST</button>
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
