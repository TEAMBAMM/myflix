const Datastore = require('nedb');
const chokidar = require('chokidar');
const path = require('path');

const fileWatcher = chokidar.watch(
  // path.join(__dirname, '../', '/movies'), {
  ('movies'), {
    persistent: true,
    //ignored: /(^|[/\\])\../ //For .DS_Store on MacOS
  }
);

console.log('DATA DIR', __dirname);
const db = new Datastore({
  filename: path.join(__dirname, 'databaseStorage'),
  autoload: true
});

db.persistence.setAutocompactionInterval(10000);

module.exports = {
  db,
  fileWatcher
}