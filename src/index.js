'use strict'

const head = str => str.charAt(0)

const tail = str => str.slice(1)

const upperHead = str => head(str).toUpperCase()

const capitalize = str => upperHead(str) + tail(str).toLowerCase()

const isUpperCaseWord = str =>
  str.split('').every(letter => letter === letter.toUpperCase())

const DOMAIN_REGEX = /\b([a-z0-9]+(-[a-z0-9]+)*\.)+([a-z]{2,})\b/gi

const COMMON_WORDS = [
  'am',
  'an',
  'as',
  'at',
  'be',
  'by',
  'do',
  'go',
  'if',
  'in',
  'is',
  'it',
  'me',
  'my',
  'no',
  'of',
  'on',
  'or',
  'so',
  'to',
  'up',
  'us',
  'we'
]

module.exports = (str, exceptions = []) => {
  let title = str
  const replacements = []

  // 1. Protect domains and exceptions
  const protect = (word, index) => {
    const placeholder = `__EX${index}__`
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`\\b${escaped}\\b`, 'gi')
    if (re.test(title)) {
      title = title.replace(re, placeholder)
      replacements.push({ placeholder, word })
    }
  }

  // Auto-detect domains
  const domains = []
  let match
  while ((match = DOMAIN_REGEX.exec(str)) !== null) {
    const tld = match[3].toLowerCase()
    if (tld.length > 2 || !COMMON_WORDS.includes(tld)) {
      domains.push(match[0])
    }
  }

  const allToProtect = [...new Set([...exceptions, ...domains])].sort(
    (a, b) => b.length - a.length
  )

  allToProtect.forEach((word, index) => protect(word, index))

  // 2. Sentence-style capitalization
  title = title
    .split(/\.(?![\d])/)
    .map(s => capitalize(s.trim()))
    .join('. ')
    .trim()

  // 3. Restore protected words
  replacements.forEach(({ placeholder, word }) => {
    const re = new RegExp(placeholder, 'gi')
    title = title.replace(re, word)
  })

  // 4. Respect uppercase words
  const titleWords = title.split(' ')
  const originalWords = str.split(' ')
  originalWords.forEach((word, index) => {
    if (isUpperCaseWord(word)) {
      if (titleWords.length === originalWords.length) {
        titleWords[index] = word
      } else {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const re = new RegExp(`\\b${escaped}\\b`, 'g')
        title = title.replace(re, word)
      }
    }
  })

  if (titleWords.length === originalWords.length) {
    title = titleWords.join(' ')
  }

  // 5. Uppercase after `:`
  if (title.includes(':')) {
    const parts = title.split(':')
    const firstPart = parts[0]
    let secondPart = parts.slice(1).join(':').trim()
    secondPart = capitalize(secondPart)

    // Restore protected words in second part
    replacements.forEach(({ word }) => {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const re = new RegExp(`\\b${escaped}\\b`, 'gi')
      secondPart = secondPart.replace(re, word)
    })

    title = `${firstPart}: ${secondPart}`
  }

  // 6. Ensure first word is capitalized unless it's a lowercase protected word
  // that was already lowercase in the original string.
  const isLowercaseProtected = [...exceptions, ...domains].some(
    word =>
      title.startsWith(word) &&
      word.charAt(0) === word.charAt(0).toLowerCase() &&
      str.startsWith(word)
  )

  if (!isLowercaseProtected) {
    title = upperHead(title) + tail(title)
  }

  return title
}
