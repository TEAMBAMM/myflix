const Datastore = require('nedb');
const download = require('image-downloader');
const db = new Datastore({
  filename: '/Users/matt/developer/fullstack-sr/test-movie-folder/data',
  autoload: true
});

async function insertMovie(movieObj, movieFilePath) {
  const data = {
    title: movieObj.title,
    filePath: movieFilePath,
    imageUrl: '',
    plot: movieObj.plot,
    rating: null,
    rated: movieObj.rated,
    releaseDate: movieObj.released
  }
  data.genres = movieObj.genres.split(', ')
  data.actors = movieObj.actors.split(', ')
  try {
    const {filename} = await download.image({
      url: movieObj.poster,
      dest: `data/moviePosters/${data.title}-poster.jpg`
    })
    data.imageUrl = filename
  } catch (e) {
    throw e
  }
  db.insert(data)
}

db.persistence.compactDatafile();

module.exports = {
  db,
  insertMovie
}