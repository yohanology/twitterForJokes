exports.register = function (server, options, next) {
    server.route([
        {
          method: 'GET',
          path: '/users',
          handler: function(request,reply){
            reply('request received');
          }
        }


      ])

    next();
};

exports.register.attributes = {
    name: 'users-routes',
    version: '0.0.1'
};