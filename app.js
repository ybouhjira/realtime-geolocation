// Require modules
var express = require('express')
  , http = require('http')
  , socketio = require('socket.io');

// Create modules' instances
var app = express()
  , server = http.Server(app)
  , io = socketio.listen(server);

// CLI args
var port = process.argv[2] || 8000;

// serve client's files
app.use('/client', express.static(__dirname + '/client'));

// start the server
server.listen(port, function() {
  console.log('HTTP server listening on port : ' + port);
})

// socket.io stuff
io.sockets.on('connection', function(socket) {
  console.log(socket);
  console.log('Client connected', socket.id);
  socket.on('moved', function(pos) {
    console.log('client', socket.io, 'moved to', JSON.stringify(pos));
    socket.broadcast.emit('moved', {pos : pos, id : socket.id});
  });
})
