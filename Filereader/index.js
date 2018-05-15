const fs = require('fs');
const chokidar = require('chokidar');
const Store = require('electron-store');
const path = require('path');
const url = require('url');
const {
  db,
  insertMovie,
  removeMovie,
  onReadySync
} = require('../data/dataStore');
let isMovieFileSet = new Boolean();
let fileWatcher;

let settingsStore = new Store({
  name: 'userSettings'
});

function setMovieFolder(newPath, oldPath) {
  if (fileWatcher === undefined) {
    let fileWatcher = chokidar.watch(newPath, {
      persistent: true,
      ignored: /(^|[/\\])\../ //For .DS_Store on MacOS
    });
    fileWatcher.on('ready', async () => {
      // Retrieve files being watched
      let watched = fileWatcher.getWatched();
      await onReadySync(watched);
      fileWatcher.on('add', filePath => insertMovie(filePath));
      fileWatcher.on('unlink', filePath => removeMovie(filePath));
      fileWatcher.on('error', error => {
        console.log(`FILEWATCHER ERROR: ${error}`)
      });
      isMovieFileSet = true;
    });
  } else {
    fileWatcher.unwatch(oldPath);
    fileWatcher.add(newPath);
  }
}

let movieFilePath = settingsStore.get('movieFilePath')
if (movieFilePath === undefined) {
  settingsStore.set('movieFilePath', '');
}

settingsStore.onDidChange('movieFilePath', (newValue, oldValue) => {
  setMovieFolder(newPath, oldPath)
});

module.exports = { 
  isMovieFileSet,
  settingsStore
};
