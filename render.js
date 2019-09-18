export function showSelectedFigure(figureName) {
  document.querySelectorAll('.figure').forEach(element => element.classList.remove('active'));
  const figureContainer = document.getElementById(`figure${(figureName.split(' ').join(''))}`);
  figureContainer.classList.add('active');
  const videoElement = getCurrentVideoElement();
  videoElement.playbackRate = 0.5;
  setTimeout(() => videoElement.play(), 500);
}

function getCurrentVideoElement() {
  const videoElement = document.querySelector('.figure.active .dance-video');
  return videoElement;
}

export function restartCurrentFigure() {
  const videoElement = getCurrentVideoElement();
  videoElement.currentTime = 0;
  setTimeout(() => videoElement.play(), 500);
}

export function pauseCurrentFigure() {
  getCurrentVideoElement().pause();
}

export function playCurrentFigure() {
  getCurrentVideoElement().play();
}

export function deactivateFigure() {
  document.querySelector('.figure.active').classList.remove('active');
}