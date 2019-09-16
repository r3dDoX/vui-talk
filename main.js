import './auth.js';
import {uuid} from './uuid.js';
import {addAgentMessage, addUserMessage} from './messages.js';

const session = uuid();

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('agentInput').addEventListener('keyup', event => {
    const textBoxValue = event.target.value;
    if (event.key === 'Enter' && textBoxValue) {
      addUserMessage(textBoxValue);
      detectIntent(textBoxValue);
      event.target.value = '';
    }
  });
});

function detectIntent(query) {
  gapi.client
    .request({
      path: `https://dialogflow.googleapis.com/v2/projects/rodriguez-c4278/agent/sessions/${session}:detectIntent`,
      method: 'POST',
      body: {
        'queryInput': {
          'text': {
            'text': query,
            'languageCode': 'de',
          },
        },
      },
    })
    .then(handleResponse, console.error);
}

function handleResponse(response) {
  console.info(response);
  addAgentMessage(response.result.queryResult.fulfillmentText);
  const agentReponse = new Audio(`data:audio/mp3;base64,${response.result.outputAudio}`);
  agentReponse.play();
  handleFigureIntents(response.result.queryResult)
}

function handleFigureIntents(queryResult) {
  switch (queryResult.intent.displayName) {
    case '2_HOME Start Figure':
      console.log('Starte Figur: ', queryResult.parameters.figure);
      break;
    case 'IN_ACTION restart':
      console.log('Starte Figur neu');
      break;
    case 'IN_ACTION stop':
      console.log('Stoppe Figur');
      break;
    case 'IN_ACTION leave':
      console.log('Verlasse Figur');
      break;
  }
}
