import {apiKey, clientId} from './secret.js';

const scope = 'https://www.googleapis.com/auth/dialogflow';

let GoogleAuth;

document.addEventListener('DOMContentLoaded', function () {
  gapi.load('client:auth2', function () {
    gapi.client.init({
      apiKey,
      clientId,
      scope,
    })
      .then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
        const isAuthorized = GoogleAuth.currentUser.get().hasGrantedScopes(scope);
        if (!isAuthorized) {
          console.error('not authorized');
        }
      })
      .catch(console.error);
  });
});