import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

const createFormData = {};

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);

  formData.forEach((value, name) => {
    createFormData[name] = Number(value);
  });

  dataProcessing(createFormData);
  // refs.form.reset();
});

function dataProcessing({ delay, step, amount }) {
  let timeDelay = delay;

  for (let i = 1; i <= amount; i += 1) {
    setTimeout(() => {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`,
            { useIcon: false }
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`,
            { useIcon: false }
          );
        });
      delay += step;
    }, timeDelay);
    timeDelay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return (promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }));
}
