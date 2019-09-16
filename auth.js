import {apiKey, clientId} from "./secret.js";

const SCOPE = 'https://www.googleapis.com/auth/dialogflow';

let GoogleAuth;
let authenticatedCallback;

export function whenAuthenticated(callback) {
  if (GoogleAuth) {
    callback();
  } else {
    authenticatedCallback = callback;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  gapi.load('client:auth2', function () {
    gapi.client.init({
      apiKey,
      clientId,
      scope: SCOPE,
    })
      .then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
        const isAuthorized = GoogleAuth.currentUser.get().hasGrantedScopes(SCOPE);
        if (isAuthorized && authenticatedCallback) {
          authenticatedCallback();
        }
      })
      .catch(console.error);
  });
});