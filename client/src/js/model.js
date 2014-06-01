/**
  * model.js
  * Contains models
  */
(function() {
  'use strict';

  angular.module('gps-tracking').

    // Options for google-maps module
    value('map',{
      center : {
        latitude: 0,
        longitude: 0
      },
      zoom : 8
    }).
    
    // socket.io
    factory('socket', function() {
      return io.connect('/');
    }).

    // users' positions
    value('users', {});

})();
