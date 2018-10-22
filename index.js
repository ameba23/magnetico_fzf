#!/usr/bin/env node
const SqliteToJson = require('sqlite-to-json')
const sqlite3 = require('sqlite3')

const exporter = new SqliteToJson({
  client: new sqlite3.Database('./database.sqlite3')
})

// exporter.tables(function (err, tables) {
//    console.log(JSON.stringify(tables,null,4));
// });

exporter.all(function (err, all) {
  all.torrents.forEach(function (torrent) {
    var infoHashHex = torrent.info_hash.toString('hex')
    console.log(torrent.name + ',' + infoHashHex)
    // console.log(JSON.stringify(torrent,null,4))
  })
})
