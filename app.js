var Gpio = require('pigpio').Gpio,
  motor = new Gpio(18, { mode: Gpio.OUTPUT }),
  pulse = 1000,
  button = new Gpio(15, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
  });

button.on('interrupt', function () {
  console.log(motor);
  // turn(pulse);
  pulse = 0;
});

function turn (pulse) {
  return motor.servoWrite(pulse);
}