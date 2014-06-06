/**
  * test.js
  * Test file that instanciate phantom.js clients
  * CLI argumetns : 
  *  --clients : number of clients
  *  --url : the url of the node.js server
  */
var require = patchRequire(require)
  , casperFactory = require('casper')
  , geoFactory = require('./casperjs-geolocation/casperjs-geolocation.js');

try {
  var casper = casperFactory.create();
  // Display help  
  if(casper.cli.args[0] === 'help')
    throw new {name:'CLI', message : 'casper test.js --clients=10' };

  // cli args
  var clientsCount = casper.cli.options.clients || 10
    , serverUrl = casper.cli.options.url || 'http://localhost:8000/client';

  // Creating casper instances
  console.log('Creating ' + clientsCount + 'clients');
  var caspers = [];
  for (var i = 0; i < clientsCount; ++i) 
    caspers.push(casperFactory.create({verbose:true, logLevel:'debug'}));

  // starting 
  caspers.forEach(function(casper) {

    // go to website
    casper.start(serverUrl);

    // Go to random geoposition
    var geo = geoFactory(casper, {
      longitude : Math.random() * 10,
      latitude : Math.random() * 10
    });

    // Change geolocatio every second
    var lats = []
      , lons = [];

    var x = Math.random() * 10
      , y = Math.random() * 10
      , angle = 0;

    casper.wait(1000, function changePosition() {

      angle = angle + 0.5 - Math.random() * 1;

      x1 = x + 0.1 * Math.cos(angle);
      y1 = y + 0.1 * Math.sin(angle);

      if (Math.abs(x1 - x) + Math.abs(y1 - y) < 10)
        geo.setPos({latitude: x1, longitude: y1});
      x = x1; y = y1;

      this.wait(1000, changePosition);
    });

    // display console.log() from remote
    casper.on('remote.message', function(msg) {
      this.echo('[remote] ' + msg, 'INFO');
    });

    // Run & wait
    casper.wait(9999999);
    casper.run();
  });

} catch (e) {
  if(e.name === 'CLI')
    console.log(e.message);
  else 
    throw e;
}
