import * as fs from 'fs'
import * as path from 'path'

export const readdir = (path) => new Promise((resolve, reject) => {
  fs.readdir(path, (err, files) => err ? reject(err) : resolve(files))
})

export const read = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, content) => err ? reject(err) : resolve(content))
})

export const isDir = (fileName) => new Promise((resolve, reject) => {
  fs.lstat(path.join('./', fileName), (err, stats) => err ? reject(err) : stats.isDirectory() ? resolve(true) : resolve(false))
})