var Gpio = require('pigpio').Gpio,
  motor = new Gpio(18, { mode: Gpio.OUTPUT }),
  pulse = 2500,
  button = new Gpio(15, {
    mode: Gpio.INPUT
  });

button.on('interrupt', function (level) {
  console.log(level)

  if (pulse === 2500) {
    turn(pulse);

    setTimeout(function () {
      pulse = 500;
      console.log(pulse);
      turn(pulse);
    }, 1000);
  } else {
    turn(0);
  }
});

function turn (pulse) {
  return motor.servoWrite(pulse);
}