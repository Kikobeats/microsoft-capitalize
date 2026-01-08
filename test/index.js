'use strict'

const test = require('ava')

const capitalize = require('..')

test('capitalize only the first world', t => {
  t.is(capitalize('Master Plan for 2019'), 'Master plan for 2019')
  t.is(
    capitalize('Microlink CDN: Global Edge Cache'),
    'Microlink CDN: Global edge cache'
  )

  t.is(
    capitalize('Cache saves your API quota', ['cache']),
    'Cache saves your API quota'
  )
})

test('respect uppercase words intentionally', t => {
  t.is(capitalize('Microlink API'), 'Microlink API')
  t.is(capitalize('Turns any URL into data'), 'Turns any URL into data')
})

test('respect dots', t => {
  t.is(capitalize('Autopilot 2.5'), 'Autopilot 2.5')
})

test('be possible omit words', t => {
  t.is(capitalize('JSON+LD & oEmbed', ['oEmbed']), 'JSON+LD & oEmbed')
  t.is(
    capitalize('Open Graph, JSON+LD & oEmbed', [
      'JSON+LD',
      'oEmbed',
      'Open Graph'
    ]),
    'Open Graph, JSON+LD & oEmbed'
  )
})

test('capitalize after dot', t => {
  t.is(
    capitalize("your next computer. it isn't a computer."),
    "Your next computer. It isn't a computer."
  )

  t.is(
    capitalize("your next computer.it isn't a computer."),
    "Your next computer. It isn't a computer."
  )
})

test('respect exceptions with dots', t => {
  t.is(
    capitalize('unavatar.io is now GA', ['unavatar.io', 'GA']),
    'unavatar.io is now GA'
  )
  t.is(
    capitalize('using Node.js with package.json'),
    'Using Node.js with package.json'
  )
})

test('respect exceptions after colon', t => {
  t.is(
    capitalize('Microlink: unavatar.io is GA', ['unavatar.io', 'GA']),
    'Microlink: unavatar.io is GA'
  )
})

test('keep original casing for exceptions at start', t => {
  t.is(capitalize('unavatar.io', ['unavatar.io']), 'unavatar.io')
  t.is(capitalize('Cache', ['cache']), 'Cache')
  t.is(capitalize('cache', ['cache']), 'cache')
})

test('auto-detect domains', t => {
  t.is(capitalize('unavatar.io is now GA', ['GA']), 'unavatar.io is now GA')
  t.is(capitalize('microlink.io is the best'), 'microlink.io is the best')
  t.is(capitalize('Visit google.com today'), 'Visit google.com today')
})

test('distinguish domains from sentence breaks (COMMON_WORDS)', t => {
  // .it is in COMMON_WORDS, so it's treated as a sentence break and capitalized
  t.is(
    capitalize("your next computer.it isn't a computer."),
    "Your next computer. It isn't a computer."
  )
  // .io is NOT in COMMON_WORDS, so it's treated as a domain and preserved
  t.is(capitalize('microlink.io is cool'), 'microlink.io is cool')
  // .ai is NOT in COMMON_WORDS, so it's treated as a domain and preserved
  t.is(capitalize('built with fetch.ai'), 'Built with fetch.ai')
})
