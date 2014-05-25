/**
  * controller.js
  * Contains the controller
  */
(function() {
  'use strict';

  angular.module('gps-tracking').
    controller('MapController', ['$scope', 'map', 'socket', 'users',  function ($scope, map, socket, users){
      // List of users
      $scope.users = users;

      // map
      $scope.map = map;

      // wathcing geolocation change
      var geo = {
        succes : function(pos) {
          socket.emit('moved', pos);
        },
        failure : function(err) {
          alert(err.message);
        },
        options : {
          enableHighAccuaracy : false,
          timeout : 1000,
          maximumAge : 0
        }
      };

      navigator.geolocation.watchPosition(geo.succes, geo.failure);

      socket.on('moved', function(client) {
        users[client.id] = {pos : client.pos};
      });

    }]);

})();
