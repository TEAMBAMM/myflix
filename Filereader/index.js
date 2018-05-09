const fs = require('fs');
const chokidar = require('chokidar');
const imdb = require('imdb-api');
const path = require('path');
const url = require('url');
const { db, insertMovie } = require('../data/dataStore');

const fileWatcher = chokidar.watch(path.join(__dirname, '../', '/movies'), {
  persistent: true,
  ignored: /(^|[/\\])\../ //For .DS_Store on MacOS
});

db.persistence.setAutocompactionInterval(5000);

fileWatcher.on('add', filePath => {
  const { name } = path.parse(filePath);
  db.findOne({ title: name }, async (err, doc) => {
    if (doc === null) {
      try {
        //Retrieve data from imdb
        const data = await imdb.get(name, { apiKey: 'ed483961' });
        //Custom insert movie function that downloads the poster image
        //and creates object in database of the data we need
        insertMovie(data, filePath);
      } catch (err) {
        console.error('IMDB DATA FAILURE', err);
      }
    }
  });
});

fileWatcher.on('unlink', filePath => {
  const { name } = path.parse(filePath);
  // Remove movie from database
  db.remove({ filePath }, { multi: true }, function(err, fileRemoved) {
    if (err) console.log('ERROR DURING DELETION - DB', err);
  });
  // Remove movie image from poster folder
  fs.unlink(
    path.join(__dirname, '../data/moviePosters', `${name}-poster.jpg`),
    err => {
      if (err) console.error(err);
    }
  );
});

fileWatcher.on('error', error => {
  console.log(`ERROR: ${error}`);
});

fileWatcher.on('ready', () => {
  // Retrieve files being watched
  let watched = fileWatcher.getWatched();
  // Extract just our movies file array
  watched = watched[path.join(__dirname, '../movies')];
  // Remove ext name, leaving an array of movie title
  // currently in the directory
  let watching = watched.map(movieName => path.parse(movieName)['name']);
  // Get count of entries in the datastore
  db.count({}, (err, dbEntryCount) => {
    // If less, movie(s) were added while the application was closed
    if (dbEntryCount < watching.length) {
      watching.forEach(movieTitle => {
        // TODO What if a duplicate is added while app is closed?
        // Double checking for duplicates
        db.findOne({ title: movieTitle }, (err, doc) => {
          if (err) console.error(err);
          if (doc === null) {
            try {
              //Retrieve data from imdb
              const data = imdb.get(name, { apiKey: 'ed483961' }).then(data => {
                //Custom insert movie function that downloads the poster image
                //and creates object in database of the data we need
                insertMovie(data, filePath);
              });
            } catch (err) {
              console.error('IMDB DATA FAILURE', err);
            }
          }
        });
      });
    } else if (dbEntryCount > watching.length) {
      // If there are more entries in the database then in the file,
      // delete the database entries
      let dbEntries = db.find({}, (err, dbEntries) => {
        // Loop through entries in the database
        dbEntries.forEach(entry => {
          let entryFileName = entry.fileName;
          // If it is not being watched, it is removed from the database
          if (!watching.includes(entryFileName)) {
            db.remove({ title: entryFileName });
          }
        });
      });
    }
  });
});
