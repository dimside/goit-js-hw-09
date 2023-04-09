const refs = {
  startButtonEl: document.querySelector('[data-start]'),
  stopButtonEl: document.querySelector('[data-stop]'),
  bodyEl: document.querySelector('body'),
};

let idInterval = null;
const CHANGE_COLOR_DELAY = 1000;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.startButtonEl.addEventListener('click', onStartBtnClick);
refs.stopButtonEl.addEventListener('click', onStopBtnClick);

function onStartBtnClick(evt) {
  idInterval = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);
  evt.target.setAttribute('disabled', '');
}

function onStopBtnClick() {
  clearInterval(idInterval);
  refs.startButtonEl.removeAttribute('disabled');
}
