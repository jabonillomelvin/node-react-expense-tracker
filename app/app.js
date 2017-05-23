
/**
 * Module dependencies.
 */
http = require('http');
connect = require('connect');
var express = require('express')
  , routes = require('./routes');
var config = require('./config')();
var app = module.exports = express.createServer();

http.createServer(app).listen(config.port, function(){
    console.log('Express server listening on port ' + config.port);
});
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

// app.listen(3000, function(){
//   console.log("Express server listening on port in %s mode", app.settings.env);
// });
