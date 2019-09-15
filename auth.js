import {apiKey, clientId} from "./secret.js";

let GoogleAuth;

document.addEventListener('DOMContentLoaded', function () {
  gapi.load('client:auth2', function () {
    gapi.client.init({
      apiKey,
      clientId,
      'scope': 'https://www.googleapis.com/auth/dialogflow',
    })
      .then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth.isSignedIn.listen(console.log);
      })
      .catch(console.error);
  });
});