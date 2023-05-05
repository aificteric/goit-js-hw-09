function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let colorInterval = null;

function startInterval() {
  startButton.disabled = true;
  stopButton.disabled = false;
  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopInterval() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(colorInterval);
  colorInterval = null;
}

startButton.addEventListener('click', () => {
  if (colorInterval === null) {
    startInterval();
  }
});

stopButton.addEventListener('click', () => {
  if (colorInterval !== null) {
    stopInterval();
  }
});
