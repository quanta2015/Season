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
var exist = (s,u) =>{
  let e = 0
  Object.values(s).map(item=>{
    if (item.user.user === u) e = 1
  })
  return e
}
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
    if ((ss===undefined)||(ss===null)) return

    // 如果不存在，则添加到用户列表
    if (!exist(sockets, data.user)) {
      let uid = ++ userCounts
      socket.user = {
        uid: uid,
        user: data.user,
        head: data.head,
      }
      sockets[uid] = socket
      socket.emit('response', { type: 'user:login', data: socket.user })
      ss.emit('response', { type: 'add', data: socket.user})

      console.log('\n res --- user:login ', socket.user)
      console.log('\n userlist --- ' + sockets)
    }else{
      let uid
      Object.values(sockets).map(item=>{
        if (item.user.user === data.user) {
          uid = item.user.uid
        }
      })
      let user = {
        uid: uid,
        user: data.user,
        head: data.head,
      }
      sockets[uid] = socket
      socket.emit('response', { type: 'user:login', data: user })
    }
  })

  socket.on('user:list', function(data) {
    let userlist = []
    Object.keys(sockets).map((userId)=>{
      userlist.push(sockets[userId].user)
    })
    userlist.forEach(item=>{ item.msg = [] })
    ss.emit('response', { type:'user:list', data:userlist})

    console.log(JSON.stringify(userlist))
  })


  socket.on('message:send', function (message) {
    message.time = new Date().getTime();
    console.log('\n msg: ', JSON.stringify(message))

    let msg = { type: 'message:send', data: message }
    if (message.msg.from === 'system') {
      socket.emit('response', msg)
      sockets[message.msg.to] && sockets[message.msg.to].emit('response', msg)
    }
    if (message.msg.to === 'system') {
      if ((ss===undefined)||(ss===null)) {
        let msg = {type: 'err', data: '客服尚未在线！'}
        socket.emit('response', msg)
      }else{
        socket.emit('response', msg)
        ss.emit('response', msg)
      }
      
    }
  })


  socket.on('user:logout', function() {
    let user = socket.user;
    // socket.emit('response', { type: 'user:logout'});

    if (!user) return;
    delete sockets[user.userId];
    // socket.disconnect(true);

    ss.emit('response', { type: 'del', data: user})

    // Object.keys(sockets).map(function(userId) {
    //   sockets[userId].emit('user:logged:out', user)
    // })
    console.log('user list:' + sockets)
  })

  socket.on('disconnect', function() {
    var user = socket.user;
    if (!user) return;

    delete sockets[user.uid];
    socket.disconnect(true);

    ss.emit('response', { type: 'del', data: user})
    // Object.keys(sockets).map(function(userId) {
    //   sockets[userId].emit('user:removed', user);
    // });
  })

});