/**
  * controller.js
  * Contains the controller
  */
(function() {
  'use strict';

  angular.module('gps-tracking').
    controller('MapController', ['$scope', 'map', 'socket', 'users',  function ($scope, map, socket, users){
      $scope.users = users;
      $scope.map = map;
    }]);

})();
