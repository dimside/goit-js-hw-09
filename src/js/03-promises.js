import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
function onFormSubmit(evt) {
  evt.preventDefault();
  let id = 1;
  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  setTimeout(() => {
    const stepDelay = Number(step.value);
    let stepPromise = stepDelay;

    createPromise(id, stepPromise);

    const intId = setInterval(() => {
      if (id < Number(amount.value)) {
        id += 1;
        stepPromise += stepDelay;
        createPromise(id, stepPromise);
      } else {
        clearInterval(intId);
        // refs.formEl.reset();
      }
    }, step.value);
  }, delay.value);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    Promise.resolve({ position, delay }).then(({ position, delay }) => {
      Notiflix.Notify.success(
        `✅ Fulfilled promise ${position} in ${delay}ms`,
        { timeout: 4000 }
      );
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    });
  } else {
    Promise.reject({ position, delay }).catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
        timeout: 4000,
      });
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}
