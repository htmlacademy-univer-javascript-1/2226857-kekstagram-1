import { sendData } from './api.js';
import { onCancelButtonClick, closeImgUploadWithSaving } from './img-form.js';
import { showAlert } from './util.js';
const form = document.querySelector('#upload-select-image');
const textHashtags = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('button[id="upload-submit"]');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const pristine = new Pristine(form);

const checkHashtagsAmount = (hashtags) => hashtags.split(' ').length < 6;

pristine.addValidator(
  textHashtags,
  checkHashtagsAmount
);

const checkHashtagsContent = (hashtags) => {
  const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}( #[A-Za-zА-яа-яЁё0-9]{1,19}){0,4}$/;
  return re.test(hashtags) || hashtags.length === 0;
};

pristine.addValidator(
  textHashtags,
  checkHashtagsContent
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSuccessButtonClick = () => {
  document.body.querySelector('.success').classList.add('hidden');
  document.body.querySelector('button[class="success__button"]').removeEventListener('click', onSuccessButtonClick);
  document.body.removeEventListener('keydown', onSuccessEscape);
  document.body.removeEventListener('click', onSuccessBodyClick);
  document.body.querySelector('.success').remove();
  document.body.classList.remove('modal-open');
};

function onSuccessEscape(evt) {
  if (evt.key === 'Escape') {
    onSuccessButtonClick();
  }
}

function onSuccessBodyClick(evt) {
  if (!document.body.querySelector('.success__inner').isEqualNode(evt.target)) {
    onSuccessButtonClick();
  }
}

const showSuccessLabel = () => {
  const successLabel = successTemplate.cloneNode(true);
  successLabel.querySelector('button[class="success__button"]').addEventListener('click', onSuccessButtonClick);
  document.body.appendChild(successLabel);
  document.body.addEventListener('keydown', onSuccessEscape);
  document.body.addEventListener('click', onSuccessBodyClick);
  document.body.classList.add('modal-open');
};

const onErrorButtonClick = () => {
  document.body.querySelector('.error').classList.add('hidden');
  document.body.querySelector('button[class="error__button"]').removeEventListener('click', onErrorButtonClick);
  document.body.removeEventListener('keydown', onErrorEscape);
  document.body.removeEventListener('click', onErrorBodyClick);
  document.body.querySelector('.error').remove();
  document.body.classList.remove('modal-open');
};

function onErrorEscape(evt) {
  if (evt.key === 'Escape') {
    onErrorButtonClick();
  }
}

function onErrorBodyClick(evt) {
  if (!document.body.querySelector('.error__inner').isEqualNode(evt.target)) {
    onErrorButtonClick();
  }
}

const showErrorLabel = () => {
  const errorLabel = errorTemplate.cloneNode(true);
  errorLabel.querySelector('button[class="error__button"]').addEventListener('click', onErrorButtonClick);
  document.body.appendChild(errorLabel);
  document.body.addEventListener('keydown', onErrorEscape);
  document.body.addEventListener('click', onErrorBodyClick);
  document.body.classList.add('modal-open');
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      () => {
        onCancelButtonClick();
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
    showAlert('Некорректный хэштег!!!');
  }
});

