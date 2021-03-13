var express = require('express');
var socket = require('socket.io');
var Gpio = require('pigpio').Gpio,

yAxis = new Gpio(12, {mode: Gpio.OUTPUT});
xAxis = new Gpio(13, {mode: Gpio.OUTPUT});

var app = express();
var server = app.listen(8000,function(){
  console.log('hello, listening to requests on port 8000')
});

app.use(express.static('public'));

var io = socket(server);
io.on('connection', function(socket){
  console.log('made connection', socket.id);

  socket.on('chat', function(data){
    console.log('X:'+ data.x + '  Y:' + data.y);
    yAxis.pwmWrite((parseInt(data.y) + 127));
    xAxis.pwmWrite((parseInt(data.x) + 127));
  });
});
