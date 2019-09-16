import './auth.js';
import {uuid} from './uuid.js';

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

function addMessage(message, type) {
  const spanElement = document.createElement('span');
  spanElement.classList.add('message', `message--${type}`);
  spanElement.innerText = message;
  const messagesContainer = document.getElementById('agentMessages');
  messagesContainer.appendChild(spanElement);
  messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
}

function addUserMessage(message) {
  addMessage(message, 'user');
}

function addAgentMessage(message) {
  const regex = /(<([^>]+)>)/ig;
  addMessage(message.replace(regex, ''), 'agent');
}

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
}
