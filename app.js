var Gpio = require('pigpio').Gpio,
    topMotor = new Gpio(18, { mode: Gpio.OUTPUT }),
    bottomMotor = new Gpio(23, { mode: Gpio.OUTPUT }),
    pulse = 2500,
    button = new Gpio(15, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      edge: Gpio.FALLING_EDGE
    }),
    timeout = null,
    ratio = 80 / 14,
    layerAngle = 60,
    motorAngle = ratio * layerAngle;

button.on('interrupt', function (level) {
  if (level !== 0 || timeout) return;
  console.log(level);

  timeout = setTimeout(initialize, 200);
});

function initialize () {
  nextStage().then(nextStage).then(nextStage).finally(function () {
    timeout = null;
  });
}

function nextStage () {
  return new Promise(function (resolve, reject) {
    // turn(topMotor, 2500);
    turn(bottomMotor, 1505);
    // setTimeout(stop.bind(topMotor), 2800);
    // setTimeout(stop.bind(bottomMotor), 2800);
    // turn topMotor 60 deg and turn bottomMotor 60 deg
    // topMotor rumble
    // turn topMotor 60 deg
    // turn bottomMotor 60 deg and resolve
  });
}

function stop () {
  return turn(this, 0);
}

function turn (motor, microseconds) {
  return motor.servoWrite(microseconds);
}

function getPulse () {
  return motor.getServoPulseWidth();
}