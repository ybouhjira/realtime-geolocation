/**
  * controller.js
  * Contains the controller
  */
(function() {
  'use strict';

  var app = angular.module('gps-tracking');

  app.controller('MapController', function ($scope, map, socket, users, helpers, STROKE_WIDTH) {
    // THE LIST IF USERS
    $scope.users = users;

    // GOOGLE MAPS SETTINGS
    $scope.map = map;

    // SOCKET.IO SERVER
    socket.on('list', function(list) {
      $scope.$apply(function() {
        // Add previousely connected users
        for(var id in list) {
          users[id] = {
            stroke : {color: helpers.getRandomColor(), stroke: STROKE_WIDTH},
            path: list[id]
          };
        }
      });
    });

    socket.on('add user', function(id) {
      $scope.$apply(function() {
        users[id] = {
          stroke : {color: helpers.getRandomColor(), stroke: STROKE_WIDTH},
          path : []
        };
      });
    });

    socket.on('remove user', function(id) {
      $scope.$apply(function() {
        delete users[id];
      });
    });

    socket.on('add step', function(data) {
      $scope.$apply(function() {
        users[data.id].path.push(data.pos);
      });
    });

    // GEOLOCATION API
    navigator.geolocation.watchPosition(
      // Sucess callback
      function (pos) {
        var p = {
          timestamp: pos.timestamp, 
          longitude: pos.coords.longitude, 
          latitude:  pos.coords.latitude 
        };

        // send signal to the server and update local data
        if(!users[socket.id]) {
          users[socket.id] = {
            stroke: {color: helpers.getRandomColor(), weight: STROKE_WIDTH},
            path: []
          };
        }
        
        // store locally
        users[socket.id].path.push(p);
        
        // send to server
        socket.emit('moved', p);
      },
      // Error callback
      function (err) { 
        alert(err.message);
      }
    );
  });
})();
