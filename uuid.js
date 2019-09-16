// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uuid() {
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