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

  app.filter('smoothen', function() {
    return function(path) {
      var lats = path.map(function(pos) {
        return pos.latitude;
      });

      var lons = path.map(function(pos) {
        return pos.longitude;
      });

      return (function bspline(lats, lons) {
        var i, t, ax, ay, bx, by, cx, cy, dx, dy, lat, lon, points;
        points = [];
        
        // For every point
        for (i = 2; i < lats.length - 2; i++) {
          for (t = 0; t < 1; t += 0.2) {
              ax = (-lats[i - 2] + 3 * lats[i - 1] - 3 * lats[i] + lats[i + 1]) / 6;
              ay = (-lons[i - 2] + 3 * lons[i - 1] - 3 * lons[i] + lons[i + 1]) / 6;
              bx = (lats[i - 2] - 2 * lats[i - 1] + lats[i]) / 2;
              by = (lons[i - 2] - 2 * lons[i - 1] + lons[i]) / 2;
              cx = (-lats[i - 2] + lats[i]) / 2;
              cy = (-lons[i - 2] + lons[i]) / 2;
              dx = (lats[i - 2] + 4 * lats[i - 1] + lats[i]) / 6;
              dy = (lons[i - 2] + 4 * lons[i - 1] + lons[i]) / 6;
              lat = ax * Math.pow(t + 0.1, 3) + bx * Math.pow(t + 0.1, 2) + cx * (t + 0.1) + dx;
              lon = ay * Math.pow(t + 0.1, 3) + by * Math.pow(t + 0.1, 2) + cy * (t + 0.1) + dy;
              points.push(new google.maps.LatLng(lat, lon));
          }
        }
        return points;
      })(lats, lons);
    }
  });
})();
