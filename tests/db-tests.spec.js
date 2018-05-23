const { expect } = require('chai')
const {
  insertMovie,
  removeMovie,
  onReadySync
} = require('../src/data/dataStore')

describe('database insert', () => {

  before(() => {
    const db = new Datastore({
      filename: testFilePath,
      autoload: true
    });
  })

  it('adds data to the database', () => {
    insertMovie()
  })
})