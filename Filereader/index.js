const chokidar = require('chokidar')
const path = require('path')
const url = require('url')

const fileWatcher = chokidar.watch(url.format({
  pathname: path.join(__dirname, '../','/movies'),
  protocol: 'file',
  slashes: true
}), {
  persistent: true
})

console.log('Watching: ', url.format({
  pathname: path.join(__dirname, '../','/movies'),
  protocol: 'file',
  slashes: true
}))

fileWatcher.on('add', path => {
  console.log(`Added: ${path}`)
})

fileWatcher.on('addDir', path => {
  console.log(`Added: ${path}`)
})

fileWatcher.on('change', path => {
  console.log(`Changed: ${path}`)
})

fileWatcher.on('unlink', path => {
  console.log(`Removed: ${path}`)
})

fileWatcher.on('unlinkDir', path => {
  console.log(`Removed: ${path}`)
})

fileWatcher.on('error', error => {
  console.log(`ERROR: ${error}`)
})

// const extractName = path => {
//   for
// }
