import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
let savedData;

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
  savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parseSavedData = JSON.parse(savedData);
    formData.email = parseSavedData.email;
    formData.message = parseSavedData.message;

    formData[event.target.name] = event.target.value;

    saveFormData(formData);
  }

  formData[event.target.name] = event.target.value;
  saveFormData(formData);
}

function getFormData() {
  savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parseGetData = JSON.parse(savedData);
    email.value = parseGetData.email;
    message.value = parseGetData.message;
  }
}

function saveFormData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
