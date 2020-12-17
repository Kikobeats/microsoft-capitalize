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
