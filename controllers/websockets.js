/**
 * controller.js
 *  The controller that keeps users in sync between client & server
 */

// @param server http server
module.exports = function(server) {
  'use strict';
   var socketio = require('socket.io')
     , Users = require('../models/users');

   // start socket.io
   var io = socketio.listen(server, { log: false })
     , users = new Users();

   // The user connects
   io.sockets.on('connection', function(socket) {
      console.log(socket.id, ': connection');

      users.addUser(socket);
      
      // he moves
      socket.on('moved', function(pos) {
        console.log(socket.id, ': moved');
        
        users.addStep(socket, pos);
      });

      // or quits
      socket.on('disconnect', function() {
        console.log(socket.id, ': disconnect');

        users.removeUser(socket);
      });
   });
}
