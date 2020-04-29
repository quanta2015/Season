#!/usr/bin/env node
const http = require('http');
const https = require('https')
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const dayjs = require('dayjs') 


const router = require('./router/index')

const app = express()
const port = 80

app.use(compression())
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'jade');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(__dirname + '/'));

app.use('/', router);


// 错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = servers.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}


// var options = {
//   key: fs.readFileSync('./key/site.key'),
//   cert:fs.readFileSync('./key/site.pem')
// }
var server  = http.createServer(app).listen(port)
// var servers = https.createServer(options,app).listen(443)
// servers.on('error', onError)
// servers.on('listening', onListening)

var ss 
var sockets = {}
var userCounts = 0

var io = require('socket.io')(server);

io.on('connection', (socket) => {


  socket.on('user:login-sys', function(data) {
    ss = socket
  })
  socket.on('user:logout-sys', function() {
    ss = null
  })

  socket.on('user:login', function(data) {
    var userId = ++userCounts;
    socket.user = {
      userId: userId,
      username: data.user,
    };
    console.log('response user:login ', socket.user)
    socket.emit('response', { type: 'user:login', data: socket.user })
    Object.keys(sockets).map(function(userId) {
      sockets[userId].emit('user-added', socket.user)
    })
    sockets[userId] = socket
    console.log('user list:' + sockets)
  })

  socket.on('user:list', function(data) {
    let userlist = []
    Object.keys(sockets).map((userId)=>{
      userlist.push(sockets[userId].user)
    })
    userlist.forEach(item=>{ item.msg = [] })
    ss.emit('response', { type:'user:list', data:userlist})
  })


  socket.on('message:send', function (message) {
    message.time = new Date().getTime();
    console.log('response_message:send: ', message)

    let msg = { type: 'message:send', data: message }
    if (message.msg.from === 'system') {
      socket.emit('response', msg)
      sockets[message.msg.to] && sockets[message.msg.to].emit('response', msg)
    }
    if (message.msg.to === 'system') {
      socket.emit('response', msg)
      ss.emit('response', msg)
    }
  })


  socket.on('user:logout', function() {
    var user = socket.user;
    socket.emit('response', { type: 'user:logout'});

    if (!user) return;
    delete sockets[user.userId];
    socket.disconnect(true);

    Object.keys(sockets).map(function(userId) {
      sockets[userId].emit('user:logged:out', user)
    })
    console.log('user list:' + sockets)
  })

  socket.on('disconnect', function() {
    var user = socket.user;
    if (!user) return;

    delete sockets[user.userId];
    socket.disconnect(true);

    Object.keys(sockets).map(function(userId) {
      sockets[userId].emit('user:removed', user);
    });
  })

});