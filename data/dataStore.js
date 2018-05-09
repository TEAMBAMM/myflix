const Datastore = require('nedb');
const path = require('path');
const download = require('image-downloader');
const exif = require('exiftool');
const db = new Datastore({
  filename: '/Users/matt/developer/fullstack-sr/test-movie-folder/data',
  autoload: true
});

async function insertMovie(movieObj, movieFilePath) {
  let parsedPath = path.parse(movieFilePath);
  exif.metadata(movieFilePath, (err, data) => {
    if (err) {
      throw err
    } else {
      console.log(data)
    }
  })
  const data = {
    title: movieObj.title,
    year: movieObj.year,
    imdbid: movieObj.imdbid,
    filePath: movieFilePath,
    imageUrl: '',
    plot: movieObj.plot,
    rating: null,
    rated: movieObj.rated,
    released: movieObj.released,
    genres: movieObj.genres.split(', '),
    actors: movieObj.actors.split(', '),
    baseFileName: parsedPath.base,
    fileType: parsedPath.ext,
    fileName: parsedPath.name,
  }
  try {
    const {imageFilename} = await download.image({
      url: movieObj.poster,
      dest: `data/moviePosters/${data.title}-poster.jpg`
    })
    data.imageUrl = imageFilename
    db.insert(data)
  } catch (e) {
    throw e
  }
}

module.exports = {
  db,
  insertMovie
}