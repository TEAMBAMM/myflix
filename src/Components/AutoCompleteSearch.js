import React from 'react'
import AutoComplete from 'material-ui/AutoComplete';

const AutoCompleteSearch = props => {

  const { movies } = props
  const movieNames = movies.map(movie => movie.title)

  return (
    <AutoComplete
      floatingLabelText="Search..."
      filter={AutoComplete.fuzzyFilter}
      dataSource={movieNames}
      maxSearchResults={5}
    />
  )
}

export default AutoCompleteSearch