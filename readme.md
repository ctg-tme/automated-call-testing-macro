# Automated Call Testing

This macro allows you to setup a Cisco Video Endpoint to place a series of calls against a single endpoint.

The Macro has a small configuration section starting on line 28 for you to change the # of tests as well as various durations you may want to set.

```javascript
//Set the # of calls you'd like to place
const callQuantity = 10;

// Set the Duration, in seconds, you'd like to have each call last
const callDuration = 80;

// Set the delay, in seconds, between each call
const callDelay = 6;

//Set the Destination URI or Phone Number for testing calls
const callDestination = ``;
```

## Installation

- Download a copy of the automated-call-testing.js file
- Log into the Devices Web UI
- Navigate to Macro Editor
- Import from file the automated-call-testing.js macro
- Edit the Config of the Macro to match your test suite
- Save and Activate the Macro, your testing should start
- When the testing is complete the Macro will deactivate itself, to prevent the tests from restarting on device boot or macro runtime restart