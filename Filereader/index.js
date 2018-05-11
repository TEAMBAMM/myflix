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

fileWatcher.on('ready', async () => {
  // Retrieve files being watched
  let watched = fileWatcher.getWatched();
  await onReadySync(watched)
  fileWatcher.on('add', filePath => insertMovie(filePath));
  fileWatcher.on('unlink', filePath => removeMovie(filePath));
  fileWatcher.on('error', error => console.log(`FILEWATCHER ERROR: ${error}`));
});

module.exports = {
  fileWatcher
}