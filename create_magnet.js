var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
  
  var name = line.split(',')[0]
  var hash = line.split(',')[1]
  console.log('magnet:?xt=urn:btih:'+hash+'&dn='+encodeURIComponent(name))
})
