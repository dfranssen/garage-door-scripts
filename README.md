# Garage Door Scripts

Scripts to be used in a HomeBridge Raspberry Pi setup with e.g. the [garagedoor command plugin](https://github.com/apexad/homebridge-garagedoor-command).

## Circuit

Following pins on the rasberry pi (3B+) are supposed to be used (BCM):

- **5** : output to relais to mimic a push on the switch in order to open/close the garage door
- **20** : input to magnetic sensor for CLOSED state
- **21** : input to magnetic sensor for OPEN state

## Installation and Configuration

On the raspberry pi terminal:

1. Install this project in the home folder of the `pi` user via git pull
2. Execute `sudo apt-get install git`
3. Execute `npm install rpi-gpio`

In the admin webapp of HomeBridge:

1. Search for and install the plugin `homebridge-garagedoor-command`
2. Provide following config for the accessory:
   - **Name**: `Garage`
   - **Command to open door**: `node /home/pi/garage-door-scripts/moveGarageDoor.js OPEN`
   - **Command to close door**: `node /home/pi/garage-door-scripts/moveGarageDoor.js CLOSE`
   - **Command to get state door**: `node /home/pi/garage-door-scripts/checkGarageDoor.js`
   - **Status Update Delay**: `12`
   - **Enable Polling (in seconds)**: `4`
   - **Log Polling**: `yes`

Back on the rasberry terminal, as for some reason the wrong accessory name is set. Check first this [github issue](https://github.com/apexad/homebridge-garagedoor-command/issues/22) if steps below are still required:

1. Execute `sudo vi /var/lib/homebridge/config.json`
2. Change `"accessory": "AladdinConnectGarageDoorOpener"` to `"accessory": "GarageCommand"`
