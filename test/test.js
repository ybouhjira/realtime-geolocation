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

    casper.start(serverUrl);

    casper.on('run.start', function() {
      this.geo = geoFactory(casper, {longitude : Math.random() * 10, latitude : Math.random() * 10});
    });

    
    casper.on('page.initilized', function() {
      this.geo.setPos({
        longitude : Math.random() * 10,
        latitude : Math.random() * 10
      });
    });

    casper.on('remote.messgae', function(msg) {
      this.echo('[remote] ', 'INFO');
      this.echo(msg);
    });

    casper.wait(99999999);
    casper.run();
  });

} catch (e) {
  if(e.name === 'CLI')
    console.log(e.message);
  else 
    throw e;
}
