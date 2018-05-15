const nameParse = fileName => {
  const notAllowed =`~\`@#$%^&*()_+-=|\\}{[];:'",.<>?/0123456789`
  let returnString = ''
  for(let i = 0; i < fileName.length; i++) {
    let currentElem = fileName[i]
    if(notAllowed.indexOf(currentElem) !== -1) {
      returnString += ' '
    } else {
      returnString += currentElem
    }
  }
  for(let i = 0; i < returnString.length; i++) {
    let currentElem = returnString[i]
    if(currentElem === ' ' && returnString[i + 1] === ' ') {
      returnString = returnString.slice(0,i).trim().toLowerCase()
    }
  }
  return returnString
}

module.exports = nameParse

// const name = 'Maze.Runner.The.Death.Cure.2018.KORSUB.HDRip.x264-STUTTERSHIT'
// nameParse(name) // maze runner the death cure 

