import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';
let formData = {};
let savedData;

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

getFormData();

function onFormSubmit(event) {
  event.preventDefault();

  if (email.value === '' || message.value === '') {
    alert('All fields must be filled');
    return;
  }

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  formData = {};
}

function onFormInput(event) {
  savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parseSavedData = JSON.parse(savedData);
    if (parseSavedData.email !== '') {
      formData.email = parseSavedData.email;
    }
    if (parseSavedData.message !== '') {
      formData.message = parseSavedData.message;
    }

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

    if (parseGetData.email) {
      email.value = parseGetData.email;
    }
    if (parseGetData.message) {
      message.value = parseGetData.message;
    }
  }
}

function saveFormData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
