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
        return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
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
