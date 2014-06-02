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
  }]);
  
  // Handle socket.io signals from the server
  app.controller('SocketIoController', ['socket', 'users' , function(socket, users) {
    socket.on('list', function(list) {
      users = list;
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
  }]);

  // Monitores geolocations changes
  app.controller('GeoController', ['map', 'socket', 'users', function(map, socket, users) {
    navigator.geolocation.watchPosition(
      function(pos) { // succes 
        // send signal to the server and update local data
        socket.emit('moved', pos);
        users[socke.id].push(pos);
      },
      function(err) { // error
        alert(err.message);
      }
    );
  }]);

})();
