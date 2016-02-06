var Gpio = require('pigpio').Gpio,
  motor = new Gpio(18, { mode: Gpio.OUTPUT }),
  pulse = 1000,
  button = new Gpio(15, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
  });

button.on('interrupt', function () {
  console.log(pulse);
  motor.servoWrite(pulse);

  if (pulse === 1000) {
    pulse = 900;
  } else if (pulse === 0) {
    pulse = 0;
  } else {
    pulse = 1000;
  }
});