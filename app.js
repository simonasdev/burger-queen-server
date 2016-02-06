var Gpio = require('pigpio').Gpio,
  motor = new Gpio(18, {mode: Gpio.OUTPUT}),
  pulseWidth = 1000,
  increment = 100,
  button = new Gpio(15, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
  });

button.on('interrupt', function (level) {
  console.log(pulseWidth);

  motor.servoWrite(pulseWidth);

  pulseWidth += increment;
  if (pulseWidth >= 2000) {
    increment = -100;
  } else if (pulseWidth <= 1000) {
    increment = 100;
  }
});