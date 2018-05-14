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
  const parsedPath = path.parse(movieFilePath);
  const name = parsedPath.name;
  // Double checking for duplicates
  const doc = await promisifiedFindOne({ title: name });
  
  if ((doc === null) || (doc.filePath !== movieFilePath)) {
    //Retrieve data from imdb
    let imdbData;
    try {
      imdbData = await imdb.get(name, { apiKey: 'ed483961' });
    } catch(e) {
      if(e) console.log('imdb data failed to load')
    }
    let data;
    //Download poster image from imdb
    if(imdbData !== undefined) {
      if(imdbData.poster !== 'N/A') {
        try {
          download.image({
            url: imdbData.poster,
            dest: `data/moviePosters/${imdbData.title}-poster.jpg`
          });
        } catch (e) {
          console.log('Image Not Loaded');
        }
      }
      data = {
        title: imdbData.title,
        year: imdbData.year,
        filePath: movieFilePath,
        imdbid: imdbData.imdbid,
        plot: imdbData.plot,
        rating: imdbData.rating + " out of 10",
        rated: imdbData.rated,
        released: imdbData.released,
        dateAdded: new Date(),
        genres: imdbData.genres.split(', '),
        actors: imdbData.actors.split(', '),
        baseFileName: parsedPath.base,
        fileType: parsedPath.ext,
        fileName: parsedPath.name
      };
    } else {
      data = {
        title: name,
        year: 'Unknown',
        filePath: movieFilePath,
        // TODO - edge case - Better method for id, could generate identical id to other 
        // unknown movie and cause an error on the react unique-key requirements
        imdbid: Math.round(Math.random() * 10000000).toString(),
        plot: 'Unknown',
        rating: null,
        rated: 'Unknown',
        released: null,
        dateAdded: new Date(),
        genres: ['Unknown'],
        actors: ['Unknown'],
        baseFileName: parsedPath.base,
        fileType: parsedPath.ext,
        fileName: parsedPath.name
      };
    }
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
      if (err) console.error('Failed to delete movie poster, does not exist')
    }
  );
  // Remove movie from database
  return promisifiedRemove({ filePath: movieFilePath }, { multi: true });
}

async function onReadySync(watched) {
  // Extract just our movies file array
  watched = watched[path.join(__dirname, '../movies')];
  // Remove ext name, leaving an array of movie title
  // currently in the directory
  let watching = watched.map(movieName => path.parse(movieName)['name']);
  // Get count of entries in the datastore
  let dbEntryCount = await promisifiedCount();
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
