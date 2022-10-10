const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.stopBtn.setAttribute('disabled', '');
let intervalId = null;

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.setAttribute('disabled', '');
  refs.stopBtn.removeAttribute('disabled');
  intervalId = setInterval(bodyColorSwitcher, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', '');
});

function bodyColorSwitcher() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
