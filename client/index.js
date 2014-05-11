var app = angular.module('gps-tracking', []);

app.controller('MapController', function($scope) {
  $scope.users = [
    {
      pos : {
        longitude : 0,
        latitude : 0
      } 
    }
  ];
});