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

// Creates or points to data storage location
let settingsStore = new Store({
  name: 'userSettings'
});

// Function invoked from event listener,
// checks if there is a watcher
function setMovieFolder(newPath, oldPath) {
  if (isWatching === false) {
    addWatcher(newPath);
  } else {
    fileWatcher.close()
    addWatcher(newPath)
  }
}

//Adds the watcher to the new filePath
function addWatcher (newPath) {
  fileWatcher = chokidar.watch(newPath, {
    persistent: true,
    ignored: /(^|[/\\])\../ //For .DS_Store on MacOS
  });
  console.log(newPath)
  //Signals to setMovieFolder that a watcher exists
  isWatching = true;
  fileWatcher.on('ready', async () => {
    // Retrieve files being watched
    let watched = fileWatcher.getWatched();
    watched = watched[newPath]
    console.log(watched)
    // Calls sync function
    await onReadySync(watched);
    fileWatcher.on('add', filePath => insertMovie(filePath));
    fileWatcher.on('unlink', filePath => removeMovie(filePath));
    fileWatcher.on('error', error => {
      console.error(`FILEWATCHER ERROR: ${error}`)
    });  
  });
}

// Retrieves initial movieFilePath.
let movieFilePath = settingsStore.get('movieFilePath')

// If it is undefined, this is the first time the app is being run.
if (movieFilePath === undefined) {
  settingsStore.set('movieFilePath', '');
} else {
  // If not, that means it has been set and a watcher can be added.
  addWatcher(movieFilePath)
}

// Event listener for change of movieFilePath,
// which will change the watcher to the new path.
settingsStore.onDidChange('movieFilePath', (newPath, oldPath) => {
  setMovieFolder(newPath, oldPath)
});

// Exported for server. 
module.exports = settingsStore;
