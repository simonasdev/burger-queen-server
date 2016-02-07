var Gpio = require('pigpio').Gpio,
    topMotor = new Gpio(23, { mode: Gpio.OUTPUT }),
    bottomMotor = new Gpio(18, { mode: Gpio.OUTPUT }),
    button = new Gpio(15, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      edge: Gpio.FALLING_EDGE
    }),
    counterButton = new Gpio(22, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      edge: Gpio.FALLING_EDGE
    }),
    timeout = null,
    port = 5000,
    counter = 0;
    // ratio = 80 / 14,
    // layerAngle = 60,
    // motorAngle = ratio * layerAngle;

var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.post('/feed', function (req, res) {
  response = handleInterrupt(0) ? 'Yep' : 'Nop';

  res.send(response);
});

app.listen(port, function () {
  console.log('Pi listening on port ' + port);
});

// Raspberry
// button.on('interrupt', handleInterrupt);

function handleInterrupt (level) {
  if (level !== 0 || timeout) return false;
  console.log(level);

  timeout = setTimeout(initialize, 200);
  return true;
}

function initialize () {
  console.log('interrupt')
  turn(bottomMotor, 1600);
  turn(topMotor, 1400);
  // nextStage(true).then(nextStage).then(nextStage).then(function () {
  //   timeout = null;
  // });
}

function nextStage (bindHandler) {
  return new Promise(function (resolve, reject) {
    turn(topMotor, 1400);
    turn(bottomMotor, 1600);

    waitForAngle(bindHandler).then(function () {
      stop(topMotor);
      stop(bottomMotor);

      setTimout(function () {
        turn(topMotor, 1400);
        turn(topMotor, 1600);

        waitForAngle().then(resolve);
      }, 1000);
    });

    // turn topMotor 60 deg and turn bottomMotor 60 deg
    // topMotor rumble
    // turn topMotor 60 deg
    // turn bottomMotor 60 deg and resolve
  });
}

waitForAngle(true).then(function () {
  console.log('bra')

  waitForAngle().then(function () {
    console.log('works!')
  })
})

function waitForAngle (bindHandler) {
  var timeut = null;

  return new Promise(function (resolve, reject) {
    if (bindHandler) {
      counterButton.on('interrupt', function (level) {
        if (level !== 0 || timeut) return false;
        console.log(counter)

        timeut = setTimeout(function () {

        }, 100);

        counter++;

        if (counter === 13 || counter === 27 || counter === 40 || counter === 53 || counter === 67 || counter === 80) {
          console.log('tick!');
          counter = counter % 80;

          counterButton.disableInterrupt();
          resolve();
        }
      });
    } else {
      counterButton.enableInterrupt(Gpio.FALLING_EDGE);
    }
  });
}

function rumble (motor, initialMikros) {
  var microseconds = initialMikros,
      interval = null,
      rumbleCount = 0;

  turn(motor, microseconds);

  interval = setInterval(function () {
    microseconds = microseconds === 1600 ? 1400 : 1600;

    turn(motor, microseconds);
    rumbleCount++;

    if (rumbleCount >= 4) clearInterval(interval);
  }, 20);
}

function stop (motor) {
  return turn(motor, 0);
}

function turn (motor, microseconds) {
  return motor.servoWrite(microseconds);
}

function getPulse () {
  return motor.getServoPulseWidth();
}