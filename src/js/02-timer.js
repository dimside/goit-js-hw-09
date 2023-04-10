import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
  dataDaysEl: document.querySelector('[data-days]'),
  dataHoursEl: document.querySelector('[data-hours]'),
  dataMinutesEl: document.querySelector('[data-minutes]'),
  dataSecondsEl: document.querySelector('[data-seconds]'),
};

refs.startBtnEl.setAttribute('disabled', '');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => value.toString().padStart(2, '0');

function writeTimerTime({ days, hours, minutes, seconds }) {
  refs.dataDaysEl.textContent = addLeadingZero(days);
  refs.dataHoursEl.textContent = addLeadingZero(hours);
  refs.dataMinutesEl.textContent = addLeadingZero(minutes);
  refs.dataSecondsEl.textContent = addLeadingZero(seconds);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let inputTime = selectedDates[0];
    let currentTime = Date.now();

    if (inputTime < currentTime) {
      Notiflix.Notify.init({ fontSize: '20px' });
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtnEl.removeAttribute('disabled');
      [...refs.timerEl.children].forEach(element => {
        element.classList.remove('stop');
      });
    }
  },
};

const timer = flatpickr('#datetime-picker', options);

refs.startBtnEl.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  const timerTime = timer.selectedDates[0];

  let currentTimerTime = timerTime - Date.now();
  if (currentTimerTime < 0) {
    Notiflix.Notify.init({ fontSize: '20px' });
    Notiflix.Notify.warning('Time out, set a new timer');
  } else {
    writeTimerTime(convertMs(currentTimerTime));

    const intervalId = setInterval(() => {
      currentTimerTime = timerTime - Date.now();
      writeTimerTime(convertMs(currentTimerTime));

      if (Math.floor(currentTimerTime / 1000) <= 0) {
        clearInterval(intervalId);
        [...refs.timerEl.children].forEach(element => {
          element.classList.add('stop');
        });
      }
    }, 1000);
  }
}
