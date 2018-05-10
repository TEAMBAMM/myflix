const fs = require('fs');
const { expect } = require('chai');
const chokidar = require('chokidar');
const path = require('path');

const fileWatcher = chokidar.watch(
  path.join(__dirname, '/test-movie-folder'), {
    persistent: true,
    ignored: /(^|[/\\])\../ //For .DS_Store on MacOS
  }
);

console.log(fileWatcher)

describe('Filewatcher', () => {
  
  after(() => {
    fs.unlink('./movies', '', (err) => {
      if (err) console.error(err)
    })
  })

  it('should be persistent', () => {
    expect(fileWatcher.options.persistent).to.equal(true);
  });
  it('should ignore dotfiles', () => {
    fs.writeFile('./movies/test.mp4', 'cool', (err) => {
      if(err) throw err
    })
    expect(fileWatcher.options.ignored).to.equal([/(^|[/\\])\../])
  })
})