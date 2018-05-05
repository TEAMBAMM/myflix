import React from 'react'
import { withRouter } from 'react-router-dom'
import { navTo } from './utils'
import AutoCompleteSearch from './AutoCompleteSearch'
import Filter from './Filter'
import Sort from './Sort'
import Cast from './Cast'

const NavBar = props => {

  const {
    onChange,
    changeFilter,
    changeSort,
    toggleFavorites,
    filter,
    sort,
    searchInput,
    favorites,
    history,
    movies
  } = props

  return (

    
    <div className='NavBarContainer'>
      <div className='NavDiv'>
        <span onClick={() => navTo('index.html', history)}>Home</span>
      </div>
      <AutoCompleteSearch movies={movies} />
      {/* <input onChange={onChange} value={searchInput} /> */}
      <Filter />
      <Sort />
      <Cast />
    </div>
  )
}

export default withRouter(NavBar)