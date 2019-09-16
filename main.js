import './auth.js';
import {whenAuthenticated} from './auth.js';

whenAuthenticated(() => {
  gapi.client
    .request({
      path: `https://dialogflow.googleapis.com/v2/projects/rodriguez-c4278/agent/sessions/${uuid()}:detectIntent`,
      method: 'POST',
      body: {
        'queryInput': {
          'text': {
            'text': 'ja hallo',
            'languageCode': 'de',
          },
        },
      },
    })
    .then(handleResponse, handleError);
});

function handleResponse(response) {
  console.log('onFulfilled', response);
}

function handleError(error) {
  console.log('onRejected', error);
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuid() {
  function randomDigit() {
    if (crypto && crypto.getRandomValues) {
      var rands = new Uint8Array(1);
      crypto.getRandomValues(rands);
      return (rands[0] % 16).toString(16);
    } else {
      return ((Math.random() * 16) | 0).toString(16);
    }
  }

  var crypto = window.crypto || window.msCrypto;
  return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}
