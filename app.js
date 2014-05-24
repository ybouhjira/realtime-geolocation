var express = require('express')
  , http = require('http')
  , mongoose = require('mongoose')
  , io = require('socket.io');

var app = express()
  , port = process.argv[2] || 8000
  , server = http.createServer(app);

// serve client's files
app.use('/client', express.static(__dirname + '/client'));

// serve socket.io
io = io.listen(server);

// start the server
server.listen(port, function() {
  console.log('HTTP server listening on port : ' + port);
})

// socket.io stuff
io.sockets.on('connection', function(socket) {
  socket.on('moved', function(pos) {
    console.log('User moved here', pos);
  });
})