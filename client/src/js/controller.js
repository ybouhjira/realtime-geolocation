/**
  * controller.js
  * Contains the controller
  */
(function() {
  'use strict';

  var app = angular.module('gps-tracking');

  // Creates the map
  app.controller('MapController', ['$scope', 'map', 'socket', 'users',  function ($scope, map, socket, users){
    $scope.users = users;
    $scope.map = map;

    // Handling incoming signals from the server
    socket.on('list', function(list) {
      // Add previousely connected users
      for(var i in list)
        users[i] = list[i];
    });

    socket.on('add user', function(id) {
      users[id] = [];
    });

    socket.on('remove user', function(id) {
      delete users[id];
    });

    socket.on('add step', function(data) {
      users[data.id].push(data.pos);
    });

    // Watching geolocation change and sending signals to the server
    navigator.geolocation.watchPosition(
      function(pos) { // succes 
        var p = {
          timestamp: pos.timestamp, 
          longitude: pos.coords.longitude, 
          latitude:  pos.coords.latitude 
        };

        // send signal to the server and update local data
        if(!users[socket.id]) 
          users[socket.id] = [];
        
        // store locally
        users[socket.id].push(p);
        
        // send to server
        socket.emit('moved', p);
      },
      function(err) { // error
        alert(err.message);
      }
    );
  }]);
})();
