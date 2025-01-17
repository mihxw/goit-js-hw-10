import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

// Ініціалізація елементів
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerFields = document.querySelectorAll('.timer .value');

let userSelectedDate = null;
let timerInterval = null;

// Функція форматування числа з додаванням нуля, якщо потрібно
const addLeadingZero = value => String(value).padStart(2, '0');

// Функція для конвертації мілісекунд в об'єкт з днями, годинами, хвилинами та секундами
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % day % hour) / minute);
  const seconds = Math.floor((ms % day % hour % minute) / second);

  return { days, hours, minutes, seconds };
}

// Оновлення інтерфейсу таймера
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

// Ініціалізація бібліотеки flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate && userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

// Обробка натискання кнопки Start
startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startButton.disabled = true;
    datetimePicker.disabled = true;

    // Запуск зворотного відліку
    timerInterval = setInterval(() => {
      const timeLeft = userSelectedDate - new Date();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const time = convertMs(timeLeft);
      updateTimerDisplay(time);
    }, 1000);
  }
});