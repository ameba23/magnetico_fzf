#!/usr/bin/env node
const clipboardy = require('clipboardy')
var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

rl.on('line', function (line) {
  const name = line.split(',')[0]
  const hash = line.split(',')[1]

  const mlink = 'magnet:?xt=urn:btih:' + hash + '&dn=' + encodeURIComponent(name)
  console.log(mlink)
  clipboardy.writeSync(mlink)
})
