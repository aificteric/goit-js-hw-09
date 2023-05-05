//! Making imports of all the neccessary libraries

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

//! Declaring all the variables, neccesary for the task

let startIntervalId = null;

const allVariables = {
  timer: document.querySelector('.timer'),
  timerValue: document.querySelectorAll('.value'),
  dataTime: document.querySelector('#datetime-picker'),
  dataDays: document.querySelector('[data-days]'),
  dataHrs: document.querySelector('[data-hours]'),
  dataMins: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  startButton: document.querySelector('button[data-start]'),
};

//* Setting up the flatpickr library

const setting = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (new Date().getTime() < selectedDates[0].getTime()) {
      allVariables.startButton.removeAttribute('disabled');
      allVariables.startButton.style.color = 'green';

      return;
    }
    Notiflix.Notify.failure('Please choose a date in the future', {
      position: 'right-top',
      closeButton: true,
    });
  },
};

allVariables.startButton.addEventListener('click', getTimeChosen);
const chosenDateTime = flatpickr('#datetime-picker', setting);
function getTimeChosen() {
  const selectTime = chosenDateTime.latestSelectedDateObj.getTime();
  allVariables.startButton.setAttribute('disabled', 'disabled');
  allVariables.startButton.style.color = 'red';
  startIntervalId = setInterval(startTime, 1000, selectTime);
}

function startTime(selectTime) {
  const { days, hours, minutes, seconds } = convertMs(
    selectTime - new Date().getTime()
  );
  getTimeDate(days, hours, minutes, seconds);
}

function getTimeDate(days, hours, minutes, seconds) {
  if (days === -1) {
    clearTimeout(startId);
    return;
  }

  addZero(days, hours, minutes, seconds);
}

//? Adding a leading zero

function addZero(days, hours, minutes, seconds) {
  allVariables.dataDays.textContent = String(days).padStart(2, '0');
  allVariables.dataHrs.textContent = String(hours).padStart(2, '0');
  allVariables.dataMins.textContent = String(minutes).padStart(2, '0');
  allVariables.dataSeconds.textContent = String(seconds).padStart(2, '0');
}

function convertMs(ms) {
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

//* Adding inline styles for the page elements

reloadedPage();
function reloadedPage() {
  allVariables.startButton.setAttribute('disabled', 'disabled');
  allVariables.startButton.style.color = 'red';
}

allVariables.timer.style.display = 'flex';
allVariables.timer.style.gap = '20px';
allVariables.timer.style.marginTop = '15px';

allVariables.startButton.style.borderRadius = '2px';
allVariables.startButton.style.borderColor = '#00b3b3';
allVariables.startButton.style.backgroundColor = '#fff';
allVariables.startButton.style.paddingLeft = '30px';
allVariables.startButton.style.paddingRight = '30px';
allVariables.startButton.style.fontWeight = '600';

allVariables.timerValue.forEach(function (element) {
  element.style.display = 'flex';
  element.style.alignItems = 'center';
  element.style.justifyContent = 'center';
  element.style.fontWeight = '700';
});
