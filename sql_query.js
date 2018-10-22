#!/usr/bin/env node
const sqlite3 = require('sqlite3')
// const filesize = require('filesize')

var db = new sqlite3.Database('./database.sqlite3')
var torrents = {}

db.serialize(function () {
  db.each('SELECT * FROM torrents', function (err, torrent) {
    if (err) throw err
    torrents[torrent.info_hash] = torrent
    db.all(`SELECT size,path FROM files WHERE torrent_id=${torrent.id}`, function (err, files) {
      if (err) throw err
      torrents[torrent.info_hash].files = files
      console.log(torrents[torrent.info_hash])
    })
  })
})

