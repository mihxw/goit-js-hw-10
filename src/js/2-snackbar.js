import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Отримання елементів з форми
const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadios = form.querySelectorAll('input[name="state"]');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Щоб не відправляти форму, а виконувати наш код

  // Отримуємо значення затримки та вибраного стану
  const delay = Number(delayInput.value);
  const state = Array.from(stateRadios).find(radio => radio.checked)?.value;

  // Перевірка на коректність значень
  if (!delay || !state) {
    iziToast.error({
      title: 'Error',
      message: 'Please provide a valid delay and select a state.',
    });
    return;
  }

  // Створення промісу
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // Виконується успішно через delay мілісекунд
      } else {
        reject(delay); // Відхиляється через delay мілісекунд
      }
    }, delay);
  });

  // Обробка результату промісу
  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});