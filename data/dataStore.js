const Datastore = require('nedb');
const path = require('path');
const imdb = require('imdb-api');
const download = require('image-downloader');
console.log('DATA DIR', __dirname);
const db = new Datastore({
  filename: path.join(__dirname, '/databaseStorage'),
  autoload: true
});

function promisiedCount() {
  return new Promise((resolve, reject) => {
    db.count({}, (err, count) => {
      err ? reject(err) : resolve(count);
    });
  });
}

function promisiedRemove(query, options) {
  return new Promise((resolve, reject) => {
    db.remove(query, (err, docs) => {
      err ? reject(err) : resolve(docs);
    });
  });
}

function promisiedFind(query, options) {
  return new Promise((resolve, reject) => {
    db.find(query, (err, docs) => {
      err ? reject(err) : resolve(docs);
    });
  });
}

function promisiedFindOne(query, options) {
  return new Promise((resolve, reject) => {
    db.findOne(query, (err, doc) => {
      err ? reject(err) : resolve(doc);
    });
  });
}

async function insertMovie(movieFilePath) {
  const { name } = path.parse(movieFilePath);
  // TODO What if a duplicate is added while app is closed?
  // Double checking for duplicates
  const doc = await promisiedFindOne({ title: name });
  if (doc === null) {
    //Retrieve data from imdb
    const imdbData = await imdb.get(name, { apiKey: 'ed483961' });
    //Download poster image from imdb
    try {
      download.image({
        url: imdbData.poster,
        dest: `data/moviePosters/${imdbData.title}-poster.jpg`
      });
    } catch (e) {
      console.log('Image Not Loaded');
    }
    let parsedPath = path.parse(movieFilePath);
    const data = {
      title: imdbData.title,
      year: imdbData.year,
      imdbid: imdbData.imdbid,
      plot: imdbData.plot,
      rating: null,
      rated: imdbData.rated,
      released: imdbData.released,
      dateAdded: new Date(),
      genres: imdbData.genres.split(', '),
      actors: imdbData.actors.split(', '),
      baseFileName: parsedPath.base,
      fileType: parsedPath.ext,
      fileName: parsedPath.name
    };
    return new Promise((resolve, reject) => {
      db.insert(data, err => {
        err ? reject(err) : resolve();
      });
    });
  }
}

async function removeMovie(movieFilePath) {
  const { name } = path.parse(filePath);
  // Remove movie image from poster folder
  await fs.unlink(
    path.join(__dirname, '../data/moviePosters', `${name}-poster.jpg`),
    err => {
      if (err) console.error(err);
    }
  );
  // Remove movie from database
  await promisiedRemove({ filePath }, { multi: true });
  
}

module.exports = {
  db,
  insertMovie,
  removeMovie
};
