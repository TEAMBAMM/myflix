const Datastore = require('nedb');
const download = require('image-downloader');
const db = new Datastore({
  filename: '/Users/matt/developer/fullstack-sr/test-movie-folder/data',
  autoload: true
});

const testMovie = {
  title: 'The Shawshank Redemption',
  _year_data: '1994',
  year: 1994,
  rated: 'R',
  released: '1994-10-14T04:00:00.000Z',
  runtime: '142 min',
  genres: 'Crime, Drama',
  director: 'Frank Darabont',
  writer:
    'Stephen King (short story "Rita Hayworth and Shawshank Redemption"), Frank Darabont (screenplay)',
  actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
  plot:
    "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
  languages: 'English',
  country: 'USA',
  awards: 'Nominated for 7 Oscars. Another 19 wins & 29 nominations.',
  poster:
    'https://ia.media-imdb.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  ratings: [
    { Source: 'Internet Movie Database', Value: '9.3/10' },
    { Source: 'Rotten Tomatoes', Value: '91%' },
    { Source: 'Metacritic', Value: '80/100' }
  ]
};

//needed title, imagePath, plotString, rating, actors, genres, releaseDate, rated

async function insertMovie(movieObj) {
  const data = {
    title: movieObj.title,
    imageUrl: '',
    plot: movieObj.plot,
    rating: null,
    rated: movieObj.rated,
    releaseDate: movieObj.released
  }
  data.genres = movieObj.genres.split(', ')
  data.actors = movieObj.actors.split(', ')
  try {
    const {filename} = await download.image({
      url: movieObj.poster,
      dest: `data/moviePosters/${data.title}-poster.jpg`
    })
    data.imageUrl = filename
  } catch (e) {
    throw e
  }
  db.insert(data)
}

// insertMovie(testMovie)


// db.insert(testData, (err, newItem) => {
//   console.log(newItem)
// })

// db.find({title: 'world'}, (err, docs) => {
//   console.log(docs)
// })

//db.remove({_id: 'rLn6Yu8XLtpfrqhr'})

db.persistence.compactDatafile();
