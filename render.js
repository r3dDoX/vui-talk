export function showSelectedFigure(figureName) {
  document.querySelectorAll('.figure').forEach(element => element.classList.remove('active'));
  const figureContainer = document.getElementById(`figure${(figureName.split(' ').join(''))}`);
  figureContainer.classList.add('active');
  figureContainer.querySelector('.dance-video').play();
}

function getCurrentVideoElement() {
  const videoElement = document.querySelector('.figure.active .dance-video');
  return videoElement;
}

export function restartCurrentFigure() {
  const videoElement = getCurrentVideoElement();
  videoElement.currentTime = 0;
  videoElement.play();
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