const fs = require('fs');
const { promisify } = require('util')
const { expect } = require('chai');
const chokidar = require('chokidar');
const path = require('path');
const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);

// let pfs = {};
// for(let method in fs) {
//   let fsMethod = fs[method]
//   if(typeof fsMethod === 'function') {
//     let pMethod = promisify(fsMethod)
//     pfs[method] = pMethod
//   }
// }

const fileWatcher = chokidar.watch(
  path.join(__dirname, './movies'), {
    persistent: true,
    //ignored: /(^|[/\\])\../ //For .DS_Store on MacOS
  }
);

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