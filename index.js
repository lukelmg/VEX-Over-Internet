/*var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output

LED.writeSync(1); //set pin state to 1 (turn LED on)
console.log('hello');
*/

var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(8000,function(){
  console.log('hello, listening to requests on port 8000')
});

// Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made connection', socket.id);

  socket.on('chat', function(data){
    console.log('X:'+ data.x + '  Y:' + data.y);
  });
});
