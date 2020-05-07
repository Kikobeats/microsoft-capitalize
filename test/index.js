'use strict'

const test = require('ava')

const capitalize = require('..')

test('capitalize only the first world', t => {
  t.is(capitalize('Master Plan for 2019'), 'Master plan for 2019')
  t.is(
    capitalize('Microlink CDN: Global Edge Cache'),
    'Microlink CDN: Global edge cache'
  )
})

test('respect uppercase words intentionally', t => {
  t.is(capitalize('Microlink API'), 'Microlink API')
  t.is(capitalize('Turns any URL into data'), 'Turns any URL into data')
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
