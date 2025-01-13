import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Крок 2.1: Підготовка елементів
const form = document.querySelector('.form');
const delayInput = form.querySelector('[name="delay"]');
const stateRadioButtons = form.querySelectorAll('[name="state"]');
const submitButton = form.querySelector('button');

// Крок 2.2: Обробник сабміту
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const delay = Number(delayInput.value);
  const state = [...stateRadioButtons].find(radio => radio.checked)?.value;

  if (state && delay > 0) {
    createPromise(delay, state);
  }
});

// Крок 2.3: Функція для створення промісу
function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else if (state === "rejected") {
        reject(delay);
      }
    }, delay);
  });

  // Крок 2.4: Обробка результатів промісу
  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
      console.log(`❌ Rejected promise in ${delay}ms`);
    });
}
