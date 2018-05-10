const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const url = require('url');
const {
  db,
  insertMovie,
  removeMovie,
  onReadySync
} = require('../data/dataStore');

const fileWatcher = chokidar.watch(
  path.join(__dirname, '../', '/movies'), {
    persistent: true,
    ignored: /(^|[/\\])\../ //For .DS_Store on MacOS
  }
);

db.persistence.setAutocompactionInterval(10000);

fileWatcher.on('add', async filePath => await insertMovie(filePath));

fileWatcher.on('unlink', filePath => removeMovie(filePath));

fileWatcher.on('error', error => console.log(`FILEWATCHER ERROR: ${error}`));

fileWatcher.on('ready', () => {
  // Retrieve files being watched
  let watched = fileWatcher.getWatched();
  onReadySync(watched)
});
