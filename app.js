var Gpio = require('pigpio').Gpio,
    topMotor = new Gpio(18, { mode: Gpio.OUTPUT }),
    bottomMotor = new Gpio(23, { mode: Gpio.OUTPUT }),
    pulse = 2500,
    button = new Gpio(15, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      edge: Gpio.FALLING_EDGE
    }),
    timeout = null;
    // ratio = 80 / 14,
    // layerAngle = 60,
    // motorAngle = ratio * layerAngle;

var express = require('express'),
    app = express();

app.post('/feed', function (req, res) {
  response = handleInterrupt(0) ? 'Yep' : 'Nop';

  res.send(response);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


button.on('interrupt', handleInterrupt);

function handleInterrupt (level) {
  if (level !== 0 || timeout) return false;
  console.log(level);

  timeout = setTimeout(initialize, 200);
  return true;
}

function initialize () {
  turn(bottomMotor, 2500);
  turn(topMotor, 1700);
  // nextStage().then(nextStage).then(nextStage).finally(function () {
  //   timeout = null;
  // });
}

function nextStage () {
  return new Promise(function (resolve, reject) {
    // turn(topMotor, 2500);
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