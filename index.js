var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    mongoose = require('mongoose');

var store  = new express.session.MemoryStore;


mongoose.connect('mongodb://supinfo:supinfo@localhost:27017/poker');

//configure app
app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'kajzenhubna'}));
  app.set('views', __dirname + '/views');
  app.set('view_options', {layout : false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use("/assets", express.static(__dirname + '/assets'));
  app.use("/css", express.static(__dirname + '/css'));
  app.use('/models', __dirname + '/models');
});

//include the maps controller
var users = require('./controllers/users_controller.js');
var rooms = require('./controllers/rooms_controller.js');
//app.<REQUEST_METHOD>(<REQUEST_URI>, <CONTROLLER_METHOD>)
app.get('/users/create', users.create);
app.post('/users/create', users.create);
app.get('/users/login', users.login);
app.post('/users/login', users.login);
app.get('/users/profile', users.profile);
app.post('/users/profile', users.profile);
app.get('/rooms/create', rooms.create);
app.post('/rooms/create', rooms.create);
app.get('/rooms/list', rooms.list);
app.post('/rooms/list', rooms.list);

server.listen(3000);
app.listen(3385);
