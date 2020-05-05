const gpio = require("rpi-gpio");
const DOOR_PIN = 5;
var direction = "UNKNOWN";

function closePins() {
  gpio.destroy(function () {});
}

function sendHigh(err) {
  if (err) throw err;
  gpio.write(DOOR_PIN, 1, function (err) {
    if (err) throw err;
    setTimeout(sendLow, 1500);
    console.log(direction);
  });
}

function sendLow() {
  gpio.write(DOOR_PIN, 0, function (err) {
    if (err) throw err;
    setTimeout(closePins, 250);
  });
}

var myArgs = process.argv.splice(2);
if (myArgs.length !== 1 || !(myArgs[0] === "OPEN" || myArgs[0] === "CLOSE")) {
  console.error("Illegal use. Provide either 'OPEN' or 'CLOSE' as argument!");
} else {
  direction = myArgs[0] === "OPEN" ? "OPENING" : "CLOSING";
  gpio.setMode(gpio.MODE_BCM);
  gpio.setup(DOOR_PIN, gpio.DIR_OUT, sendHigh);
}
