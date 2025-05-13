import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('button');
const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(event.currentTarget.elements.delay.value);
  const isActive = event.target.elements.state.value === 'fulfilled';
  const promise = createPromise(delay, isActive, delay);
  promise
    .then(value => {
      iziToast.show({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(value => {
      iziToast.show({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
      });
    });
});

function createPromise(value, isActive, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isActive) {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
}
