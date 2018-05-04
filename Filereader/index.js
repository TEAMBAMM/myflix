const chokidar = require('chokidar')
const path = require('path')
const url = require('url')

const fileWatcher = chokidar.watch(path.join(__dirname, '../','/movies'), {
  persistent: true
})

console.log('Watching: ', path.join(__dirname, '../','/movies'))

fileWatcher.on('add', path => {
  const name = extractName(path)
  console.log(`Added: ${path}`)
})

fileWatcher.on('addDir', path => {
  const name = extractName(path)
  console.log(`Added: ${path}`)
})

fileWatcher.on('change', path => {
  const name = extractName(path)
  console.log(`Changed: ${path}`)
})

fileWatcher.on('unlink', path => {
  const name = extractName(path)
  console.log(`Removed: ${path}`)
})

fileWatcher.on('unlinkDir', path => {
  const name = extractName(path)
  console.log(`Removed: ${path}`)
})

fileWatcher.on('error', error => {
  console.log(`ERROR: ${error}`)
})

const extractName = path => {
  for(let i = path.length - 1; i > 0; i--) {
    if (path[i] === '/' || path[i] === '\\') {
      return path.slice(i + 1)
    }
  }
}
