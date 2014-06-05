/**
  * model.js
  * Contains models
  */
(function() {
  'use strict';

  var app = angular.module('gps-tracking');

  // Options for google-maps module
  app.value('map',{
    center : {
      latitude: 0,
      longitude: 0
    },
    zoom : 8
  });
    
  // socket.io
  app.factory('socket', function() {
    return io.connect('/');
  });

  // users' positions
  app.value('users', {});

  // map polylines width
  app.constant('STROKE_WIDTH', 2);

})();
