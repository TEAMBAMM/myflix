const { fileWatcher } = require('./index');
const {
  insertMovie,
  removeMovie,
  onReadySync
} = require('./dataStore');

fileWatcher.on('ready', async () => {
  // Retrieve files being watched
  let watched = fileWatcher.getWatched();
  await onReadySync(watched)
  fileWatcher.on('add', filePath => insertMovie(filePath));
  fileWatcher.on('unlink', filePath => removeMovie(filePath));
  fileWatcher.on('error', error => console.log(`FILEWATCHER ERROR: ${error}`));
});