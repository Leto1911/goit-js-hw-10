import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
let userSelectedDate;
const btn = document.querySelector('button');
const inp = document.querySelector('input');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector(`[data-hours]`);
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chooseDate = selectedDates[0];
    btn.disabled = true;
    if (chooseDate > new Date()) {
      btn.disabled = false;
      userSelectedDate = chooseDate;
    } else {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      userSelectedDate = null;
    }
  },
};
flatpickr('#datetime-picker', options);

btn.addEventListener('click', () => {
  if (!userSelectedDate) return;
  btn.disabled = true;
  inp.disabled = true;
  const timeCount = setInterval(() => {
    const today = new Date();
    const different = userSelectedDate - today;
    if (different <= 0) {
      clearInterval(timeCount);
      display(0, 0, 0, 0);
      inp.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(different);
    display(days, hours, minutes, seconds);
  }, 1000);
});

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
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function display(days, hours, minutes, seconds) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}
