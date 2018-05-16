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
let fileWatcher;
let isWatching = false

let settingsStore = new Store({
  name: 'userSettings'
});

function setMovieFolder(newPath, oldPath) {
  if (isWatching === false) {
    addWatcher(newPath);
  } else {
    console.log('HIT ELSE IN SETMOVIEFOLDER')
    fileWatcher.emit('unlinkDir', oldPath);
    fileWatcher.emit('addDir', newPath);
    console.log(fileWatcher.getWatched( ))
  }
}

function addWatcher (newPath) {
  // let { dir } = path.parse(newPath)
  // console.log(dir)
  console.log('HIT UNDEFINED IN SETMOVIEFOLDER')
  fileWatcher = chokidar.watch(newPath, {
    persistent: true,
    ignored: /(^|[/\\])\../ //For .DS_Store on MacOS
  });
  isWatching = true;
  return new Promise((resolve, reject) => {
    fileWatcher.on('ready', async () => {
      // Retrieve files being watched
      let watched = fileWatcher.getWatched();
      console.log(watched)
      watched = watched[newPath]
      console.log('WATCHED: ', watched)
      await onReadySync(watched);
      fileWatcher.on('add', filePath => insertMovie(filePath));
      fileWatcher.on('unlink', filePath => removeMovie(filePath));
      fileWatcher.on('error', error => {
        console.log(`FILEWATCHER ERROR: ${error}`)
      });
      resolve()
    });
  });
}

let movieFilePath = settingsStore.get('movieFilePath')

if (movieFilePath === undefined) {
  settingsStore.set('movieFilePath', '');
} else {
  addWatcher(movieFilePath)
}

settingsStore.onDidChange('movieFilePath', (newPath, oldPath) => {
  setMovieFolder(newPath, oldPath)
});

// settingsStore.set('movieFilePath', '/Users/matt/Developer/fullstack-sr/myflix/movies')
// isWatching = true
// settingsStore.set('movieFilePath','/Users/matt/Developer/fullstack-sr/myflix/testfolder')

module.exports = settingsStore;
