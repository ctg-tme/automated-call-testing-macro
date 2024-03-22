/********************************************************
Copyright (c) 2024 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at
               https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*********************************************************
* Author(s):              Bobby McGonigle
*                         Technical Marketing Engineering, Technical Leader
*                         CTG TME
*                         Cisco Systems
*
* Consulting Engineer(s)  Luis Delgado
*                         Technical Marketing Engineering, Technical Leader
*                         CTG TME
*                         Cisco Systems 
*/

import xapi from 'xapi';

//Set the # of calls you'd like to place
const callQuantity = 10;

// Set the Duration, in seconds, you'd like to have each call last
const callDuration = 80;

// Set the delay, in seconds, between each call
const callDelay = 6;

//Set the Destination URI or Phone Number for testing calls
const callDestination = ``;

//- - - - - - -

// Used to track # of calls placed
let count = 0;

let callEndHandler = '';

async function startTestCall() {
  const isOnCall = await xapi.Status.Call.get() == '' ? false : true;

  if (!isOnCall) {
    count++;
    console.log(`Starting Call #${count}`)
    xapi.Command.UserInterface.Message.TextLine.Display({ Text: `Test ${count} out of ${callQuantity}`, X: 5000, Y: 1 })
    xapi.Command.Dial({ Number: callDestination, DisplayName: `Call: [${count}]`, TrackingData: `Call: [${count}]` });
  };
};

xapi.Event.CallSuccessful.on(event => {
  clearTimeout(callEndHandler);
  callEndHandler = setTimeout(function () {
    xapi.Command.Call.Disconnect();
  }, callDuration * 1000);
});

xapi.Event.CallDisconnect.on(event => {
  if (event.RequestedURI.includes(callDestination)) {
    clearTimeout(callEndHandler);
    console.log(`Call #${count} Disconnected Event`, event);

    setTimeout(function () {
      if (count < callQuantity) {
        startTestCall();
      } else {
        count = 0;
        console.warn('Call Testing has Concluded, deactivating Macro');
        xapi.Command.UserInterface.Message.TextLine.Display({ Text: `All ${callQuantity} tests(s) Complete`, X: 5000, Y: 1 })
        setTimeout(async () => {
          await xapi.Command.Macros.Macro.Deactivate({ Name: _main_macro_name() });
          await xapi.Command.Macros.Runtime.Restart();
        }, 1000)

      }
    }, callDelay * 1000);
  }
});

async function init() {
  console.warn('Call Testing has Started...');

  startTestCall();
}

init();