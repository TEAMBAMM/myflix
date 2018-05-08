const Datastore = require('nedb');
const path = require('path');
const download = require('image-downloader');
const db = new Datastore({
  filename: '/Users/matt/developer/fullstack-sr/test-movie-folder/data',
  autoload: true
});

async function insertMovie(movieObj, movieFilePath) {
  const data = {
    title: movieObj.title,
    year: movieObj.year,
    imdbid: movieObj.imdbid,
    filePath: movieFilePath,
    imageUrl: '',
    plot: movieObj.plot,
    rating: null,
    rated: movieObj.rated,
    released: movieObj.released
  }
  let parsedPath = path.parse(movieFilePath);
  data.genres = movieObj.genres.split(', ');
  data.actors = movieObj.actors.split(', ');
  data.baseFileName = parsedPath.base;
  data.fileType = parsedPath.ext;
  data.fileName = parsedPath.name;
  try {
    const {filename} = await download.image({
      url: movieObj.poster,
      dest: `data/moviePosters/${data.title}-poster.jpg`
    })
    data.imageUrl = filename
    db.insert(data)
  } catch (e) {
    throw e
  }
}

module.exports = {
  db,
  insertMovie
}