const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const url = require('url');
const {
  db,
  insertMovie,
  removeMovie,
  // promisifiedCount,
  // promisifiedFind,
  // promisifiedRemove
} = require('../data/dataStore');

const fileWatcher = chokidar.watch(
  path.join(__dirname, '../', '/movies'), {
    persistent: true,
    ignored: /(^|[/\\])\../ //For .DS_Store on MacOS
  }
);

db.persistence.setAutocompactionInterval(10000);

fileWatcher.on('add', filePath => insertMovie(filePath));

fileWatcher.on('unlink', filePath => removeMovie(filePath));

fileWatcher.on('error', error => console.log(`ERROR: ${error}`));

// fileWatcher.on('ready', async () => {
//   // Retrieve files being watched
//   let watched = fileWatcher.getWatched();
//   // Extract just our movies file array
//   watched = watched[path.join(__dirname, '../movies')];
//   // Remove ext name, leaving an array of movie title
//   // currently in the directory
//   let watching = watched.map(movieName => path.parse(movieName)['name']);
//   // Get count of entries in the datastore
//   let dbEntryCount = await promisifiedCount()
//   // If less, movie(s) were added while the application was closed
//   if (dbEntryCount < watching.length) {
//     (async function watchingLoop() {
//       for(let i = 0; i < watching.length; i++) {
//         await insertMovie
//       }
//     })()
//     // watching.reduce( (p, _, i) => {
//     //   p.then(_ => insertMovie(data, watched[i]))
//     // }, promise.resolve() );
//   } else if (dbEntryCount > watching.length) {
//     // If there are more entries in the database then in the file,
//     // delete the database entries
//     let dbEntries = await promisifiedFind({})
//     // Loop through entries in the database
//     dbEntries.reduce( (p, entry, i) => {
//       let entryFileName = entry.fileName;
//       if (!watching.includes(entryFileName)) {
//         promiedRemove({ title: entryFileName });
//       }
//     }, promise.resolve())

//     dbEntries.forEach(entry => {
//       // If it is not being watched, it is removed from the database
//     });
    
//   }
// });
