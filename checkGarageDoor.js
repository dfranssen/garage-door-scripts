const gpio = require("rpi-gpio");

const CLOSE_PIN = 20;
const OPEN_PIN = 21;

gpio.setMode(gpio.MODE_BCM);

function closePins() {
  gpio.destroy(function () {});
}

function checkCloseStatus(err) {
  if (err) throw err;
  gpio.read(CLOSE_PIN, function (err, value) {
    if (err) throw err;
    if (value) {
      console.log("CLOSED");
      closePins();
    } else {
      gpio.setup(OPEN_PIN, gpio.DIR_IN, checkOpenStatus);
    }
  });
}

function checkOpenStatus(err) {
  if (err) throw err;
  gpio.read(OPEN_PIN, function (err, value) {
    if (err) throw err;
    if (value) {
      console.log("OPEN");
    } else {
      // TODO: intermediate status from file?
      console.log("UNKNOWN");
    }
    closePins();
  });
}

gpio.setup(CLOSE_PIN, gpio.DIR_IN, checkCloseStatus);
