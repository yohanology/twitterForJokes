var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000,
  routes: {
    cors: {
      headers: ["Access-Control-Allow-Credentials"],
      credentials: true
    }
  }
});

var plugins = [
  { register: require('hapi-mongodb'),
    options: {
      url: 'mongodb://localhost:27017/twitter-for-jokes',
      settings: {
        db: {
          native_parser: false
        }
      }
    }
  }
];

server.register(plugins, function(err){
  if (err){
    throw err;
  }

  server.start(function(){
    console.log('Server running at ' + server.info.uri);
  });
});


