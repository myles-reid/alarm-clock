'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

const clockHours = select('.hours');
const clockMinutes = select('.minutes');
const outputTime = select('.time');
const alarmTime = select('.alarm-set-time');
const inputHours = select('.input-hours');
const inputMinutes = select('.input-minutes');
const setAlarmBtn = select('.set-alarm');
const cancelAlarmBtn = select('.remove-alarm');

let time = '';

function getTime() {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  const temp = new Date();
  time = temp.toLocaleTimeString([], options);
}

function updateTime() {
  getTime();
  outputTime.innerText = time;
}

setInterval(updateTime, 1000);
