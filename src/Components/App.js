import React, { Component } from 'react';
import { Router, Route, withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Player from './Player';
import axios from 'axios';
import AllMovies from './AllMovies';
import MiniMovie from './MiniMovie';
import SingleMovie from './SingleMovie';
import ip from 'ip';

injectTapEventPlugin();

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: { error: 'Please select a movie!'},
      searchInput: '',
      isPlaying: false,
      filter: 'All',
      sort: 'Recently Added',
      currentMoviePosition: '',
      favorites: false,
      filteredOutput: [],
      scanning: false,
      clients: [],
      ip: '',
      isLoading: true,
      castReceivers: [{ name: 'No receivers found!', host: '0.0.0.0' }]
    };
    this.onChange = this.onChange.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.deviceScanner = this.deviceScanner.bind(this);
    this.test = this.test.bind(this);
    this.selectMovie = this.selectMovie.bind(this)
    this.deselectMovie = this.deselectMovie.bind(this)
    this.updateSortedList = this.updateSortedList.bind(this)
    this.mergeClientMovies = this.mergeClientMovies.bind(this)
  }
  
  async componentDidMount() {
    let res = await axios.get('http://localhost/api/movies')
    const movies = res.data.movies
    res = await axios.get('http://localhost/api/ip');
    const ip = res.data.ip
    await this.updateSortedList(movies)
    this.deviceScanner();
    this.setState({ ...this.state, movies, ip, isLoading: false })
  }

  deselectMovie() {
    this.setState({ selectedMovie: { error: 'Please select a movie!'} }) 
  }

  selectMovie(movie) {
    this.setState({...this.state, selectedMovie: movie})
  }
  
  deviceScanner() {
    if (!this.state.scanning) {
      setInterval(async () => {
        let res = await axios.get(`http://localhost/api/clients`);
        const clients = res.data.clients;
        res = await axios.get('http://localhost/api/castreceivers');
        let castReceivers = res.data.castReceivers;
        res = await axios.get('http://localhost/api/ip');
        const ip = res.data.ip;
        res = await axios.get('http://localhost/api/movies')
        const movies = res.data.movies
        castReceivers = (castReceivers.length < 1) ? [{ name: 'No receivers found!', host: '0.0.0.0' }] : castReceivers
        if(this.state.clients.length > 0) this.mergeClientMovies()
        else this.setState({...this.state, clients, castReceivers, ip, movies });
        if(this.state.movies.length !== this.state.movies.filteredOutput) this.updateSortedList()
      }, 5000);
    }
  }

  async mergeClientMovies() {
    let res = await axios.get('http://localhost/api/movies')
    let movieMap = new Map()
    res.data.movies.forEach(movie => {
      movieMap.set(movie.imdbid, movie)
    })
    console.log(movieMap)
    // const clients = this.state.clients
    // clients.forEach(async client => {
    //   res = await axios.get(`http://${client}/api/movies`)
    //   let clientMovies = res.data.movies
    //   clientMovies.forEach(movie => {
    //     console.log(movieMap.has(movie.imdbid))
    //     if(movieMap.has(movie.imdbid) === false) {
    //       movieMap.set(movie.imdbid, {...movie, ip: client})
    //     }
    //   })
    // })
    // console.log('Merged movies: ', [...movieMap.values()])
    // this.setState({...this.state, movies: [...movieMap.values()]})
  }

  async test() {
    console.log(this.state);
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

  async changeSort(event, value) {
    event.preventDefault();
    await this.setState({ ...this.state, sort: value });
    this.updateSortedList();
  }


  updateSortedList(movies) {
    let moviesList = (movies) ? movies : this.state.movies // movies array from state
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
    this.setState({ ...this.state, filteredOutput: filteredOutput });
  }

  render() {
    const {
      filter,
      sort,
      searchInput,
      favorites,
      movies,
      filteredOutput,
      castReceivers,
      selectedMovie,
      ip,
      isLoading,
      clients
    } = this.state;
    const { onChange, changeFilter, changeSort, toggleFavorites, test, selectMovie, deselectMovie } = this;

    return (
      <div>
        <button onClick={() => test()}>TEST</button><span>Connected Devices: {clients}</span>
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
          castReceivers={castReceivers}
          selectedMovie={selectedMovie}
          deselectMovie={deselectMovie}
          ip={ip}
        />
        <Route
          exact path="*index.html"
          render={() => <AllMovies movies={filteredOutput} selectMovie={selectMovie} isLoading={isLoading}/>}
        />
        <Route
          exact path="/:id/"
          render={() => <SingleMovie movies={movies} selectMovie={selectMovie} />}
        />
        <Route
          exact path="/:id/player/"
          render={() => <Player movies={movies} ip={ip} />}
        />
      </div>
    );
  }
}

export default withRouter(App);
