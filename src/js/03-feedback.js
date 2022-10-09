import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

getFormData();

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parseSavedData = JSON.parse(savedData);
    email.value = parseSavedData.email;
    message.value = parseSavedData.message;
  }
}
