const Datastore = require('nedb');
const fs = require('fs')
const path = require('path');
const download = require('image-downloader');
console.log('DATA DIR', __dirname)
const db = new Datastore({
  filename: path.join(__dirname, '/databaseStorage'),
  autoload: true
});

async function insertMovie(movieObj, movieFilePath) {
  let parsedPath = path.parse(movieFilePath);
  
  // fs.readFile('../Filereader/The Godfather.mp4', function (err, data) {
  //   if (err)
  //     throw err;
  //   else {
  //     exif.metadata(data, function (err, metadata) {
  //       if (err)
  //         throw err;
  //       else
  //         console.log(metadata);
  //     });
  //   }
  // });
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