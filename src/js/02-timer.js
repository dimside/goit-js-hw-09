import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
console.log("dsgfsdf")
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
    inputTime = selectedDates[0];
    currentTime = Date.now();
    deltaTime = inputTime - currentTime;
    if (deltaTime > 0) {
      refs.startBtnEl.removeAttribute('disabled');

      const timerTimeInMs = new Date(deltaTime);
      writeTimerTime(convertMs(timerTimeInMs));
    } else {
        // alert('Please choose a date in the future');
        Notiflix.Notify.warning('Memento te hominem esse');
    }
    refs.startBtnEl.addEventListener('click', onStartBtnClick);
    function onStartBtnClick() {
      const intervalId = setInterval(() => {
        writeTimerTime(convertMs(inputTime - Date.now()));

        if (Math.floor((inputTime - Date.now()) / 1000) === 0) {
          clearInterval(intervalId);

          [...refs.timerEl.children].forEach(element => {
            element.classList.add('stop');
          });
        }
      }, 1000);
    }
  },
};
flatpickr('#datetime-picker', options);
