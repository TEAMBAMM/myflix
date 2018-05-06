import React from 'react'
import { withRouter } from 'react-router-dom'
import AutoComplete from 'material-ui/AutoComplete';
import { navTo, filterByName } from './utils'

const AutoCompleteSearch = props => {

  const { movies, history } = props
  const movieNames = movies.map(movie => movie.title)

  return (
    <AutoComplete
      hintText="Search..."
      filter={AutoComplete.fuzzyFilter}
      dataSource={movieNames}
      maxSearchResults={5}
      animated={false}
      onNewRequest={selectedName => navTo(`/${filterByName(selectedName, movies).imdbid}/`, history)}
    />
  )
}

export default withRouter(AutoCompleteSearch)