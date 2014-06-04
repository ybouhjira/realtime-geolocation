// Require modules
var websockets = require('./controllers/websockets')
  , http = require('./controllers/http');

// run the http server and then attach socket.io to it
websockets(http());

