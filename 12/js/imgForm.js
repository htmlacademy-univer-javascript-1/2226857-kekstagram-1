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

const setEffect = (evt) => {
  img.classList.remove(`effects__preview--${currentEffect}`);
  img.classList.add(`effects__preview--${evt.target.value}`);
  currentEffect = evt.target.value;
};

const funSmaller =  () => {
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
};

const funBigger = () => {
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
};

const closeImgUpload = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  radios.forEach((radio) => {
    radio.removeEventListener('input', setEffect);
  });
  smaller.removeEventListener('click', funSmaller);
  bigger.removeEventListener('click', funBigger);
  document.body.removeEventListener('keydown', escImgUpload);
  imgUploadCancel.removeEventListener('click', closeImgUpload);
};

function escImgUpload(evt) {
  if (evt.keyCode === 27) {
    closeImgUpload();
  }
}

const showImgUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadCancel.addEventListener('click', closeImgUpload);
  document.body.addEventListener('keydown', escImgUpload);
};

const fun = (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
};

smaller.addEventListener('click', funSmaller);

bigger.addEventListener('click', funBigger);

radios.forEach((radio) => {
  radio.addEventListener('input', setEffect);
});

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
