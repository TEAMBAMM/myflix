const fs = require('fs');
const { promisify } = require('util')
const { expect } = require('chai');
const Datastore = require('nedb');
const chokidar = require('chokidar');
const path = require('path');
const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);
const {
  insertMovie,
  removeMovie,
  onReadySync
} = require('../data/dataStore');

const fileWatcher = chokidar.watch('./movies', {
  persistent: true,
  ignored: /(^|[/\\])\../ //For .DS_Store on MacOS
});

const db = new Datastore({
  filename: path.join(__dirname, 'databaseStorage'),
  autoload: true
});

describe('Filewatcher', () => {
  
  before(async () => {
    const fileArray = await readdir('tests/movies');
    if(fileArray.length) {
      await (async function fileLoop() {
        for (let i = 0; i < fileArray.length; i++) {
          await unlink(path.join(__dirname,'movies/' ,fileArray[i]));
        }
      })();
    }
  })

  it('should be persistent', () => {
    expect(fileWatcher.options.persistent).to.equal(true);
  });

  it('should ignore dotfiles', async () => {
    await writeFile(path.join(__dirname, './movies/test.mp4'),'stuff')
    let watched = fileWatcher.getWatched()
    console.log(watched)
    watched = watched[path.join(__dirname, './movies')];
    console.log(watched)
    let watchedFileNames = watched.map(fileName => path.parse(fileName)['name']);
    console.log(watchedFileNames)
    const dotFileArray = watchedFileNames.map((elem) => elem.charAt(0) === '.' ? true : false)
    console.log(dotFileArray)
    expect(dotFileArray.length).to.equal(0)
  })
})