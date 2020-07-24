'use strict'

const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const isUpperCaseWord = str =>
  str.split('').every(letter => letter === letter.toUpperCase())

module.exports = (str, exceptions = []) => {
  // all minus unless the first world
  let title = str
    .split('.')
    .map(str => capitalize(str.trim()))
    .join('. ')
    .trim()

  // respect special words
  exceptions.forEach(word => {
    const re = new RegExp(`\\b(?:${word})\\b`, 'gi')
    if (re.test(str)) {
      title = title.replace(re, word)
    }
  })

  // respect uppercase words
  title = title.split(' ')
  str.split(' ').forEach((word, index) => {
    if (isUpperCaseWord(word)) {
      title[index] = word
    }
  })

  title = title.join(' ')

  // uppercase after `:`
  if (title.includes(':')) {
    title = title.split(':')
    title = `${title[0]}: ${capitalize(title[1].trim())}`
  }

  return title
}
