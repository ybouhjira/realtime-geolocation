'use strict';
/*
  * test.js
  * Test file that instanciate phantom.js clients
  * CLI argumetns : 
  *  --clients : number of clients
  *  --url : the url of the node.js server
  */
var require = patchRequire(require)
  , casperFactory = require('casper')
  , geoFactory = require('./casperjs-geolocation/casperjs-geolocation.js');

function get_cli_args () {
  var casper = casperFactory.create();

  if(casper.cli.args[0] === 'help')
    throw { 
      name:'CLI', 
      message : '--clients\t Number of clients\n' +
                '--url\t server URL\n' + 
                '--debug\t enable debug'
    };

  return {
     clients: casper.cli.options.clients || 10,
     url: casper.cli.options.url || 'http://localhost:8000/client',
     debug: casper.cli.options.debug || false
  };
}

function create_caspers(count, debug) {
  var caspers = [];
  for (var i = 0; i < count; ++i) 
    caspers.push(casperFactory.create(debug? {verbose:true, logLevel:'debug'} : {}));
  return caspers;
}

function run(caspers, url) {
  caspers.forEach(function(casper) {
    geoFactory(casper, {longitude : Math.random() * 10, latitude : Math.random() * 10});

    casper.start(url);

    casper.on('page.initialized', function() {
          this.evaluate(function(){
            anuglar.module('gps-tracking')
              .controller('foo', ['socket', function(socket){
                console.log('running evaluated code');
                socket.emit('moved', {longitude : Math.random() * 30, latitude : Math.random() * 30});
              }]);
          });
        });

    casper.on('remote.message', function(msg) {
          this.echo('[remote] ', 'INFO');
          this.echo(msg);
        });
    casper.wait(99999999);
    casper.run();
  });
}

(function() {
  try {
    var cli = get_cli_args();
    run(create_caspers(cli.clients, cli.debug), cli.url);
  } catch (e) {
    if (e.name === 'CLI') 
      console.log(e.message);
    else
      throw e;
  }
})();
