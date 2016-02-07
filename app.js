var Gpio = require('pigpio').Gpio,
  motor = new Gpio(18, { mode: Gpio.OUTPUT }),
  pulse = 2500,
  button = new Gpio(15, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  }),
  timeout = null;

button.on('interrupt', function (level) {
  if (timeout) return;
  console.log(level)

  timeout = setTimeout(function () {
    timeout = null;

    if (pulse === 2500) {
      turn(pulse);
      pulse = 500;
      console.log('1: ' + pulse);
    } else if (getPulse() === 2500) {
      turn(pulse);
      console.log('2: ' + pulse);
    } else {
      turn(0);
      pulse = 2500;
      console.log('3: ' + pulse);
    }
  }, 50);
});

function turn (pulse) {
  return motor.servoWrite(pulse);
}

function getPulse () {
  return motor.getServoPulseWidth();
}