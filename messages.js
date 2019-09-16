function scrollToBottom(messagesContainer) {
  messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
}

function addMessage(message, type) {
  const spanElement = document.createElement('span');
  spanElement.classList.add('message', `message--${type}`);
  spanElement.innerText = message;
  const messagesContainer = document.getElementById('agentMessages');
  messagesContainer.appendChild(spanElement);
  scrollToBottom(messagesContainer);
}

export function addUserMessage(message) {
  addMessage(message, 'user');
}

export function addAgentMessage(message) {
  const regex = /(<([^>]+)>)/ig;
  addMessage(message.replace(regex, ''), 'agent');
}