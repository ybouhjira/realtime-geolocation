
/**
  * http_controller.js
  * runs the http server
  */
module.exports = function() {
  'use strict';
  var express = require('express')
    , http = require('http');

  // create http server
  var app = express()
    , server = http.Server(app);

  // serve client's static files
  app.use('/client', express.static(__dirname + '/../client'));

  // run the server
  var port = process.argv[2] || 8000;
  server.listen(port, function() {
    console.log('Server started : http://localhost:' + port + '/client');
  });

  return server;
}
