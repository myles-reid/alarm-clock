'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, element, callback) {
  return element.addEventListener(event, callback);
}

const clockHours = select('.hours');
const clockMinutes = select('.minutes');
const outputTime = select('.time');
const alarmTime = select('.alarm-set-time');
const inputHours = select('#input-hours');
const inputMinutes = select('#input-minutes');
const setAlarmBtn = select('.set-alarm');
const cancelAlarmBtn = select('.remove-alarm');
const REGEX_LETTERS = new RegExp(/^[a-zA-Z ]+$/);
const alarmSound = new Audio('./assets/media/audio/alarm-sound.mp3');
alarmSound.type = 'audio/mp3(wav)';
alarmSound.loop = false;


let onScreenTime = '';
let alarmSetTime = '';
let time = '';

function getTime() {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }

  const bgOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  const temp = new Date();
  onScreenTime = temp.toLocaleTimeString([], options);
  time = temp.toLocaleTimeString([], bgOptions);
}

function updateTime() {
  getTime();
  outputTime.innerText = onScreenTime;
}

setInterval(updateTime, 1000);

function validateInput(input) {
  if (REGEX_LETTERS.test(input.value)){
    input.value = '';
  }
}

function alarmCheck() {
  if (alarmTime.innerText !== '') {
    alarmTime.innerText = ''
  }
}

function clearInputs() {
  inputHours.value = '';
  inputMinutes.value = '';
}

function convertInput() {
let hours = inputHours.value;
let minutes = inputMinutes.value;
alarmCheck();
  if ((hours < 24 && minutes < 60) && (hours >= -1 && minutes >= -1)) {
    alarmTime.innerText = `${hours}:${minutes}`;
    alarmSetTime = `${hours}:${minutes}:00`
    clearInputs();
  } else if ((hours >= 24 || isNaN(hours)) && (minutes >= 60 || isNaN(minutes))){
    inputHours.classList.add('red-border');
    inputMinutes.classList.add('red-border');
  } else if (hours >= 24 || isNaN(hours)){
    inputHours.classList.add('red-border');
  } else if (minutes >= 60 || isNaN(minutes)) {
    inputMinutes.classList.add('red-border');
  }
}

function borderCheck() {
  let minuteBorderCheck = inputMinutes.classList.contains('red-border');
  let hourBorderCheck = inputHours.classList.contains('red-border');

  console.log('minuteBorderCheck:', minuteBorderCheck);
  console.log('hourBorderCheck:', hourBorderCheck);
  console.log('alarmTime.innerText:', alarmTime.innerText);

  if ((minuteBorderCheck || hourBorderCheck) && (alarmTime.innerText !== '')) {
    inputMinutes.classList.remove('red-border');
    inputHours.classList.remove('red-border');
    clearInputs();
    console.log('here')
  }
}

function alarm() {
  if (alarmSetTime === time) {
    alarmSound.play();
  }
}

listen('click', setAlarmBtn, () => {
  convertInput();
  borderCheck();
  setInterval(alarm, 1000);
});

listen('click', cancelAlarmBtn, () => {
  clearInputs();
  alarmTime.innerText = '';
  inputHours.classList.remove('red-border');
  inputMinutes.classList.remove('red-border');
})

listen('focus', inputHours, () => {
  if (inputHours.classList.contains('red-border')) inputHours.classList.remove('red-border'); 
});

listen('focus', inputMinutes, () => {
  if (inputMinutes.classList.contains('red-border')) inputMinutes.classList.remove('red-border'); 
});

listen('input', inputHours, () => {
  validateInput(inputHours);
});

listen('input', inputMinutes, () => {
  validateInput(inputMinutes);
});