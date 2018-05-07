const chokidar = require('chokidar');
const imdb = require('imdb-api');
const path = require('path');
const url = require('url');
const { db, insertMovie } = require('../data/dataStore')

const fileWatcher = chokidar.watch(path.join(__dirname, '../', '/movies'), {
  persistent: true,
  ignored: '.DS_Store', // For mac computers
  ignoreInitial: true, // So it does not check files already present
});

console.log('Watching: ', path.join(__dirname, '../', '/movies'));

fileWatcher.on('add', async path => {
  const name = extractName(path);
  if (db.find({title: name})) {
    console.log('HIT: ', name)
  } else {
    try {
      //Retrieve data from imdb
      const data = await imdb.get(name, { apiKey: 'ed483961' })
      //Custom insert movie function that downloads the poster image
      //and creates object in database of the data we need
      insertMovie(data, path)
    } catch (err){
      console.error('IMDB DATA FAILURE', err)
    }
    console.log(`Added: ${path}`);
  }
});

fileWatcher.on('addDir', path => {
  const name = extractName(path);
  console.log(`Added Directory: ${path}`);
});

fileWatcher.on('change', path => {
  const name = extractName(path);
  console.log(`Changed: ${path}`);
});

fileWatcher.on('unlink', path => {
  const name = extractName(path);
  db.remove({filePath: path}, {multi: true}, function(err, fileRemoved) {
    if (err) console.log('ERROR DURING DELETION - DB', err)
  })
  console.log(`Removed: ${path}`);
});

fileWatcher.on('unlinkDir', path => {
  const name = extractName(path);
  console.log(`Removed Directory: ${path}`);
});

fileWatcher.on('error', error => {
  console.log(`ERROR: ${error}`);
});

const extractName = path => {
  for (let i = path.length - 1; i > 0; i--) {
    if (path[i] === '/' || path[i] === '\\') {
      return path.slice(i + 1, -4);
    }
  }
};
