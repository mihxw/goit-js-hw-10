import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Крок 3.1: Підготовка елементів
const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const timerFields = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]")
};

// Крок 3.2: Ініціалізація flatpickr
let userSelectedDate = null;
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const now = new Date();

    if (userSelectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  }
});

// Крок 3.3: Функція для форматування числа
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Крок 3.4: Функція для перетворення мілісекунд у час
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

// Крок 3.5: Запуск зворотного відліку
function startTimer() {
  const intervalId = setInterval(() => {
    const now = new Date();
    const remainingTime = userSelectedDate - now;

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      startButton.disabled = true;
      datetimePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    timerFields.days.textContent = addLeadingZero(days);
    timerFields.hours.textContent = addLeadingZero(hours);
    timerFields.minutes.textContent = addLeadingZero(minutes);
    timerFields.seconds.textContent = addLeadingZero(seconds);
  }, 1000);

  // Зробити кнопки неактивними після запуску
  startButton.disabled = true;
  datetimePicker.disabled = true;
}

// Крок 3.6: Обробник кнопки старт
startButton.addEventListener('click', startTimer);
