import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
  datetimePicker: document.querySelector('#datetime-picker'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
};

let timerEndDate = null;
let timeFrame = null;
let intervalId = null;

flatpickr('#datetime-picker', options);

refs.startBtn.setAttribute('disabled', '');

refs.startBtn.addEventListener('click', () => {
  uppDateTime();
  intervalId = setInterval(uppDateTime, 1000);
  refs.datetimePicker.setAttribute('disabled', '');
  refs.startBtn.setAttribute('disabled', '');
});

function checkDate(selectedDate) {
  if (selectedDate < options.defaultDate) {
    Notiflix.Notify.failure('Please choose a date in the future', {
      clickToClose: true,
    });
    return;
  }
  refs.startBtn.removeAttribute('disabled');
  timerEndDate = new Date(selectedDate);
}

function uppDateTime() {
  timeFrame = timerEndDate.getTime() - new Date().getTime();
  if (timeFrame > 0) {
    uppDateInterface(convertMs(timeFrame));
    return;
  }
  clearInterval(intervalId);
}

function uppDateInterface({ seconds, minutes, hours, days }) {
  refs.secondsValue.textContent = addLeadingZero(seconds);
  refs.minutesValue.textContent = addLeadingZero(minutes);
  refs.hoursValue.textContent = addLeadingZero(hours);
  refs.daysValue.textContent = addLeadingZero(days);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (String(value).length > 2) {
    return String(value);
  }
  return String(value).padStart(2, '0');
}
