// Provide desired path as a string
// Be sure to wrap component in withRouter and pass history from props
export const navTo = (path, history) => {
  history.push(path)
}

// Provide search string and complete movie array
export const filterByName = (searchName, movies) => {
  return movies.filter(movie => movie.title === searchName)[0]
}