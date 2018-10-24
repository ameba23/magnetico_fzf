#!/usr/bin/env node
const sqlite3 = require('sqlite3')
const mime = require('mime')
// const filesize = require('filesize')

var db = new sqlite3.Database('./database.sqlite3')
var torrents = {}

// speed things up
var debugMode = true

var query = ''
if (debugMode) 
  query = ' WHERE id < 100'


db.serialize(function () {
  db.each('SELECT * FROM torrents'+query, function (err, torrent) {
    if (err) throw err
    torrents[torrent.info_hash] = torrent
    db.all(`SELECT size,path FROM files WHERE torrent_id=${torrent.id}`, function (err, files) {
      if (err) throw err
      torrents[torrent.info_hash].files = files

      // Find the 'dominant' file extension by size, to determine what kind of torrent this is
      // TODO: grab mimetype, split('/')[0] to get stuff like 'audio','video', and then categorise
      var filetypes = {}
      files.forEach(file => {
        var extension = file.path.split('.').slice(-1)[0]
        if (filetypes[extension]) {
          filetypes[extension] += file.size
        } else {
          filetypes[extension] = file.size
        }
      })
      var biggestValue = Object.values(filetypes).sort((a,b)=> a-b).slice(-1)[0] 
      var primaryExt = Object.keys(filetypes).find(ext => filetypes[ext] === biggestValue)
      torrents[torrent.info_hash].primaryMime = mime.getType(primaryExt)
      // if (torrents[torrent.info_hash].primaryMime)
      //   // if (torrents[torrent.info_hash].primaryMime.split('/')[0] === 'application')
      //   if (torrents[torrent.info_hash].primaryMime === 'application/pdf')
          console.log(torrents[torrent.info_hash])
    })
  })
})

