/**
 * controller.js
 *  The controller that keeps users in sync between client & server
 */

// @param server http server
module.exports = function(server) {
  'use strict';
   var socketio = require('socket.io')
     , Users = require('./Users');

   // start socket.io
   var io = socketio.listen(server)
     , users = new Users();

   // The user connects
   io.sockets.on('connection', function(socket) {
      users.addUser(socket);
      
      // he moves
      socket.on('moved', function(pos) {
        users.addStep(socket, pos);
      });

      // or quits
      socket.on('disconnect', function() {
        users.removeUser(socket);
      });
   });
}
