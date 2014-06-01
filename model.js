/**
  * The Users class : 
  *   Contains the geo data of all users and keeps up-to-data via Socket.io
  */
module.exports = function Users() {
  this._users = {}; // the list of users
}

/**
  * Add a user when he is connected
  * @param socket The user's socket
  */
Users.prototype.addUser = function(socket) {
  this._users[socket.id] = [];

  // tell all other users
  socket.broadcast.emit('add user', socket.id);

  // send the list of users to the new one
  socket.emit('list', this._users);
};

/**
 * Removes when disconnected
 * @param The user's socket
 */
Users.prototype.removeUser = function(socket) {
  delete this._users[socket.id];

  // inform other users
  socket.broadcast.emit('remove user', socket.id);
}

/**
  * Add a step to user's data when he moves
  * @param socket The user's socket
  * @param pos The position where he moved
  */
Users.prototype.addStep = function(socket, pos) {
  this._users[socket.id].push(pos);

  // tell everyone else this user moved 
  socket.broadcast.emit('add step', {id: socket.id, pos : pos});
}
