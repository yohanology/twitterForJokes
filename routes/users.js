exports.register = function (server, options, next) {
    server.route([
        {
          method: 'POST',
          path: '/users',
          handler: function(request,reply){
            var db = request.server.plugins['hapi-mongodb'].db;

            var user = {
              username: request.payload.user.username,
              email:    request.payload.user.email,
              password: request.payload.user.password
            };

            db.collection('users').insert(user, function(err, writeResult){
              reply(writeResult);
            });
          }
        }


      ])

    next();
};

exports.register.attributes = {
    name: 'users-routes',
    version: '0.0.1'
};