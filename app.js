process.env.DEBUG = true;

var express = require('express')
  , http = require('http')
  , socketIo = require('socket.io');

// modules instances
var app = express()
  , server = http.Server(app)
  , io = socketIo(server);

// CLI args
var port = process.argv[2] || 8000;

// serve client's files
app.use('/client', express.static(__dirname + '/client'));

// start the server
server.listen(port, function() {
  console.log('Server started : http://localhost' + (port != 80 ? ':' + port : '') + '/client');
});

// socket.io event handeling
io.sockets.on('connection', function(socket) {
  console.log('client connected', socket.id);
  socket.on('moved', function(pos) {
    console.log('client', socket.id, 'moved');
    socket.broadcast.emit('moved', {
      pos : pos, 
      id : socket.id
    });
  });
})
