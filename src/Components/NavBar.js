import React from 'react'

const NavBar = props => {

  const {
    onChange,
    changeFilter,
    changeSort,
    toggleFavorites,
    filter,
    sort,
    searchInput,
    favorites
  } = props
  console.log(favorites)

  return (
    <div className='NavBarContainer'>
      <div className='NavDiv'>
        <span>Home</span>
      </div>
      <div className='NavDiv'>
        <input onChange={onChange} value={searchInput} />
      </div>
      <div className='NavDiv'>
        <span onClick={toggleFavorites}>Favorites</span>
      </div>
      <div className='NavDiv'>
        <span>Filter</span>
      </div>
      <div className='NavDiv'>
        <span>Sort</span>
      </div>
      <div className='NavDiv'>
        <span>Cast</span>
      </div>
      <div className='NavDiv'>
        <span>Devices</span>
      </div>
      <div className='NavDiv'>
        <span>Settings</span>
      </div>
    </div>
  )
}

export default NavBar