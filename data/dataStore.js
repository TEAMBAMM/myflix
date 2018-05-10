const Datastore = require('nedb');
const path = require('path');
const fs = require('fs');
const imdb = require('imdb-api');
const download = require('image-downloader');
console.log('DATA DIR', __dirname);
const db = new Datastore({
  filename: path.join(__dirname, '/databaseStorage'),
  autoload: true
});

function promisifiedCount() {
  return new Promise((resolve, reject) => {
    db.count({}, (err, count) => {
      err ? reject(err) : resolve(count);
    });
  });
}

function promisifiedRemove(query, options) {
  return new Promise((resolve, reject) => {
    db.remove(query, options, (err, docs) => {
      err ? reject(err) : resolve(docs);
    });
  });
}

function promisifiedFind(query, options) {
  return new Promise((resolve, reject) => {
    db.find(query, (err, docs) => {
      err ? reject(err) : resolve(docs);
    });
  });
}

function promisifiedFindOne(query, options) {
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
  const doc = await promisifiedFindOne({ title: name });
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
      filePath: movieFilePath,
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
  const { name } = path.parse(movieFilePath);
  // Remove movie image from poster folder
  await fs.unlink(
    path.join(__dirname, '../data/moviePosters', `${name}-poster.jpg`),
    err => {
      err
        ? console.error('Failed to delete movie poster, does not exist')
        : console.log('Image successfully deleted');
    }
  );
  // Remove movie from database
  return promisifiedRemove({ title: name }, { multi: true });
}

async function onReadySync(watched) {
  // Extract just our movies file array
  watched = watched[path.join(__dirname, '../movies')];
  // Remove ext name, leaving an array of movie title
  // currently in the directory
  let watching = watched.map(movieName => path.parse(movieName)['name']);
  // Get count of entries in the datastore
  let dbEntryCount = await promisifiedCount();
  console.log(dbEntryCount)
  console.log(watching.length)
  // If less, movie(s) were added while the application was closed
  if (dbEntryCount < watching.length) {
    await (async function watchingLoop() {
      for (let i = 0; i < watching.length; i++) {
        let movieFilePath = watched[i]
        await insertMovie(movieFilePath);
      }
    })();
  } else if (dbEntryCount > watching.length) {
    // // If there are more entries in the database then in the file,
    // // delete the database entries
    let dbEntries = await promisifiedFind({});
    await (async function dbEntriesLoop() {
      for (let i = 0; i < dbEntries.length; i++) {
        let entryFileName = dbEntries[i]['fileName'];
        let entryFilePath = dbEntries[i]['filePath'];
        if (!watching.includes(entryFileName)) {
          // If it is not being watched, it is removed from the database
          await removeMovie(entryFilePath);
        }
      }
    })();
  }
}

module.exports = {
  db,
  insertMovie,
  removeMovie,
  onReadySync
};
