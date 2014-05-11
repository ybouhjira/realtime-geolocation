var app = angular.module('gps-tracking', ['google-maps']);

app.service('map', function() {
  return {
    center : {
      latitude: 0,
      longitude: 0
    },
    zoom : 8
  };  
});

app.controller('MapController', function($scope, map) {
  $scope.users = [
    {
      pos : {
        longitude : 0,
        latitude : 0
      } 
    }
  ];

  $scope.map = map;
});