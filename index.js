var Hapi = require('hapi');
var Path = require('path');

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

server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'templates')
});

var plugins = [
  { register: require('./routes/static-pages.js') },
  { register: require('./routes/users.js') },
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


