//Make connection
var socket = io.connect('http://localhost:8000/');

var gamepadState = 0;

gamepadState = {
  x: 0,
  y: 0
}

function update() {
  const gamepads = navigator.getGamepads();
  if (gamepads[0]) {
    gamepadState = {
      x: parseInt(gamepads[0].axes[0].toFixed(3) * 127),
      y: parseInt(gamepads[0].axes[1].toFixed(3) * -127)
    }
  }
  socket.emit('chat', {
   x: gamepadState.x,
   y: gamepadState.y
  });
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
