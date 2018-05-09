const Datastore = require('nedb');
const path = require('path');
const download = require('image-downloader');
console.log('DATA DIR', __dirname)
const db = new Datastore({
  filename: path.join(__dirname, '/databaseStorage'),
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
    const {imageFilename} = await download.image({
      url: movieObj.poster,
      dest: `data/moviePosters/${data.title}-poster.jpg`
    })
    data.imageUrl = imageFilename
    db.insert(data)
  } catch (e) {
    const imageFilename = path.join(__dirname, 'moviePosters/sad-face.jpg')
    data.imageUrl = imageFilename
    db.insert(data)
  }
}

module.exports = {
  db,
  insertMovie
}