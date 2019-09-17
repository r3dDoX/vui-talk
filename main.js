import './auth.js';
import {uuid} from './uuid.js';
import {addAgentMessage, addUserMessage} from './messages.js';
import {
  deactivateFigure,
  pauseCurrentFigure,
  playCurrentFigure,
  restartCurrentFigure,
  showSelectedFigure,
} from './render.js';

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

  const speechRecognition = new webkitSpeechRecognition();
  speechRecognition.lang = 'de-CH';

  speechRecognition.addEventListener('result', (event) => {
    const speechToText = event.results[0][0].transcript;
    addUserMessage(speechToText);
    detectIntent(speechToText);
  });
  speechRecognition.addEventListener('audiostart', () => document.getElementById('agentMicrophone').classList.add('recording'));
  speechRecognition.addEventListener('audioend', () => document.getElementById('agentMicrophone').classList.remove('recording'));

  document.getElementById('agentMicrophone').addEventListener('click', () => {
    speechRecognition.start();
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
      showSelectedFigure(queryResult.parameters.figure);
      break;
    case 'IN_ACTION restart':
      restartCurrentFigure();
      break;
    case 'IN_ACTION stop':
      pauseCurrentFigure();
      break;
    case 'IN_ACTION leave':
      deactivateFigure();
      break;
    case 'IN_ACTION continue':
      playCurrentFigure();
      break;
  }
}
