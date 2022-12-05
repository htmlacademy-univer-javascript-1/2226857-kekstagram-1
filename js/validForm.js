import { sendData } from './api.js';
import { closeImgUpload, closeImgUploadWithSaving } from './imgForm.js';
const form = document.querySelector('#upload-select-image');
const text = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('button[id="upload-submit"]');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const pristine = new Pristine(form);

const validHashtagsAmount = (hashtags) => hashtags.split(' ').length < 6;

pristine.addValidator(
  text,
  validHashtagsAmount
);

const validHashtags = (hashtags) => {
  const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}( #[A-Za-zА-яа-яЁё0-9]{1,19}){0,4}$/;
  // eslint-disable-next-line eqeqeq
  return re.test(hashtags) || hashtags == '';
};

pristine.addValidator(
  text,
  validHashtags
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const closeSuccessLabel = () => {
  document.body.querySelector('.success').classList.add('hidden');
  document.body.querySelector('button[class="success__button"]').removeEventListener('click', closeSuccessLabel);
  document.body.removeEventListener('keydown', escSuccessLabel);
  document.body.removeEventListener('click', clickSuccessLabel);
  document.body.querySelector('.success').remove();
  document.body.classList.remove('modal-open');
};

function escSuccessLabel(evt) {
  if (evt.keyCode === 27) {
    closeSuccessLabel();
  }
}

function clickSuccessLabel(evt) {
  if (!document.body.querySelector('.success__inner').isEqualNode(evt.target)) {
    closeSuccessLabel();
  }
}

const showSuccessLabel = () => {
  const successLabel = successTemplate.cloneNode(true);
  document.body.appendChild(successLabel);
  document.body.querySelector('button[class="success__button"]').addEventListener('click', closeSuccessLabel);
  document.body.addEventListener('keydown', escSuccessLabel);
  document.body.addEventListener('click', clickSuccessLabel);
  document.body.classList.add('modal-open');
};

const closeErrorLabel = () => {
  document.body.querySelector('.error').classList.add('hidden');
  document.body.querySelector('button[class="error__button"]').removeEventListener('click', closeErrorLabel);
  document.body.removeEventListener('keydown', escErrorLabel);
  document.body.removeEventListener('click', clickErrorLabel);
  document.body.querySelector('.error').remove();
  document.body.classList.remove('modal-open');
};

function escErrorLabel(evt) {
  if (evt.keyCode === 27) {
    closeErrorLabel();
  }
}

function clickErrorLabel(evt) {
  if (!document.body.querySelector('.error__inner').isEqualNode(evt.target)) {
    closeErrorLabel();
  }
}

const showErrorLabel = () => {
  const errorLabel = errorTemplate.cloneNode(true);
  document.body.appendChild(errorLabel);
  document.body.querySelector('button[class="error__button"]').addEventListener('click', closeErrorLabel);
  document.body.addEventListener('keydown', escErrorLabel);
  document.body.addEventListener('click', clickErrorLabel);
  document.body.classList.add('modal-open');
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      () => {
        closeImgUpload();
        unblockSubmitButton();
        showSuccessLabel();
      },
      () => {
        closeImgUploadWithSaving();
        unblockSubmitButton();
        showErrorLabel();
      },
      new FormData(evt.target),
    );
  } else {
    const alertContainer = document.createElement('div');
    alertContainer.style.zIndex = '100';
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = '0';
    alertContainer.style.top = '0';
    alertContainer.style.right = '0';
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '30px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';

    alertContainer.textContent = 'Некорректный хэштег';

    form.append(alertContainer);
    const ALERT_SHOW_TIME = 5000;
    setTimeout(() => {
      alertContainer.remove();
    }, ALERT_SHOW_TIME);
  }
});

