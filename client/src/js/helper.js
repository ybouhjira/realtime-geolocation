/**
 * helper.js
 * Contains helper functions
 */

(function(){
  'use strict';

  var app = angular.module('gps-tracking');

  app.factory('helpers', function() {
    return {
      // Return a random color in hex notation
      getRandomColor: function() {
        var letters = '0123456789ABCDEF'.split('')
          , color = '#';

        for (var i = 0; i < 6; i++ ) 
            color += letters[Math.floor(Math.random() * 16)];

        return color;
      }
    };
  });

  // Returns the last item in an array
  app.filter('last', function() {
    return function(array) {
      return array[array.length - 1];
    }
  });
})();
