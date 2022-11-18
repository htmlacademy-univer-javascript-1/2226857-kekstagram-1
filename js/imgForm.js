const imgUploadInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('#upload-cancel');
const smaller = document.querySelector('.scale__control--smaller');
const bigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const img = imgPreview.querySelector('img');
const radios = document.querySelectorAll('input[name="effect"]');
const hashtag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');

let valueOfTransform = 1;
let currentEffect = 'original';

imgUploadCancel.addEventListener('click', () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imgUploadInput.value = '';
  }
});

const showImgUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

smaller.addEventListener('click', () => {
  switch (scaleValue.value) {
    case '100%':
      scaleValue.value = '75%';
      valueOfTransform = 0.75;
      break;
    case '75%':
      scaleValue.value = '50%';
      valueOfTransform = 0.5;
      break;
    case '50%':
      scaleValue.value = '25%';
      valueOfTransform = 0.25;
      break;
    default:
      break;
  }
  img.style.transform = `scale(${valueOfTransform})`;
});

bigger.addEventListener('click', () => {
  switch (scaleValue.value) {
    case '25%':
      scaleValue.value = '50%';
      valueOfTransform = 0.5;
      break;
    case '50%':
      scaleValue.value = '75%';
      valueOfTransform = 0.75;
      break;
    case '75%':
      scaleValue.value = '100%';
      valueOfTransform = 1;
      break;
    default:
      break;
  }
  img.style.transform = `scale(${valueOfTransform})`;
});

const setEffect = (effect) => {
  img.classList.remove(`effects__preview--${currentEffect}`);
  img.classList.add(`effects__preview--${effect}`);
  currentEffect = effect;
};

radios.forEach((radio) => {
  radio.addEventListener('input', () => {
    setEffect(radio.value);
  });
});

const fun = (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
};

hashtag.addEventListener('focus', () => {
  hashtag.addEventListener('keydown', fun);
});
hashtag.addEventListener('blur', () => {
  hashtag.removeEventListener('keydown', fun);
});

comment.addEventListener('focus', () => {
  comment.addEventListener('keydown', fun);
});
comment.addEventListener('blur', () => {
  comment.removeEventListener('keydown', fun);
});

imgUploadInput.addEventListener('change', showImgUpload);
