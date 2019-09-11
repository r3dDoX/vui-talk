var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const colorMapping = {
  aqua: 'aqua',
  beige: 'beige',
  schwarz: 'black',
  blau: 'blue',
};
const colors = Object.keys(colorMapping);
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')} ;`;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'de';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector('.output');
const bg = document.querySelector('html');
const hints = document.querySelector('.hints');

let colorHTML = '';
colors.forEach(function (color, index) {
    console.log(color, index);
    colorHTML += `<span style="background-color:${colorMapping[color]};"> ${color} </span>`;
});
hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

document.body.onclick = () => {
    recognition.start();
    console.log('Ready to receive a color command.');
};

recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const color = event.results[last][0].transcript;
    diagnostic.textContent = 'Result received: ' + color + '.';
    bg.style.backgroundColor = color;
    console.log('Confidence: ' + event.results[0][0].confidence);
};

recognition.onspeechend = () => {
    recognition.stop();
};

recognition.onnomatch = () => {
    diagnostic.textContent = 'I didnt recognise that color.';
};

recognition.onerror = (event) => {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}