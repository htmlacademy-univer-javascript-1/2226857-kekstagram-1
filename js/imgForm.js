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
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('input[name="effect-level"]');
const slider = effectLevel.querySelector('.effect-level__slider');

effectLevelValue.value = 0;
let valueOfTransform = 1;
let currentEffect = 'none';
const filters = ['grayscale', 'sepia', 'invert', 'blur', 'brightness'];
const filtersOfValue = ['', '', '%', 'px', ''];

const setEffect = (evt) => {
  img.classList.remove(`effects__preview--${currentEffect}`);
  img.classList.add(`effects__preview--${evt.target.value}`);
  currentEffect = evt.target.value;
  let index;
  switch (evt.target.value) {
    case 'none':
      slider.noUiSlider.destroy();
      img.style.removeProperty('filter');
      break;
    case 'chrome':
      if (slider.noUiSlider === undefined) {
        noUiSlider.create(slider, {
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
          format: {
            to: function (value) {
              return value.toFixed(1);
            },
            from: function (value) {
              return parseFloat(value);
            },
          },
        });
      } else {
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
          format: {
            to: function (value) {
              return value.toFixed(1);
            },
            from: function (value) {
              return parseFloat(value);
            },
          },
        });
      }
      index = 0;
      break;
    case 'sepia':
      if (slider.noUiSlider === undefined) {
        noUiSlider.create(slider, {
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
          format: {
            to: function (value) {
              return value.toFixed(1);
            },
            from: function (value) {
              return parseFloat(value);
            },
          },
        });
      } else {
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
          format: {
            to: function (value) {
              return value.toFixed(1);
            },
            from: function (value) {
              return parseFloat(value);
            },
          },
        });
      }
      index = 1;
      break;
    case 'marvin':
      if (slider.noUiSlider === undefined) {
        noUiSlider.create(slider, {
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
          format: {
            to: function (value) {
              return value.toFixed(0);
            },
            from: function (value) {
              return parseFloat(value);
            },
          },
        });
      } else {
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
          format: {
            to: function (value) {
              return value.toFixed(0);
            },
            from: function (value) {
              return parseFloat(value);
            },
          },
        });
      }
      index = 2;
      break;
    case 'phobos':
      if (slider.noUiSlider === undefined) {
        noUiSlider.create(slider, {
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
          format: {
            to: function (value) {
              return value.toFixed(1);
            },
            from: function (value) {
              return parseFloat(value);
            },
          },
        });
      } else {
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
          format: {
            to: function (value) {
              return value.toFixed(1);
            },
            from: function (value) {
              return parseFloat(value);
            },
          },
        });
      }
      index = 3;
      break;
    case 'heat':
      if (slider.noUiSlider === undefined) {
        noUiSlider.create(slider, {
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
          format: {
            to: function (value) {
              return value.toFixed(1);
            },
            from: function (value) {
              return parseFloat(value);
            },
          },
        });
      } else {
        slider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
          format: {
            to: function (value) {
              return value.toFixed(1);
            },
            from: function (value) {
              return parseFloat(value);
            },
          },
        });
      }
      index = 4;
      break;
  }
  slider.noUiSlider.on('update', () => {
    effectLevelValue.value = slider.noUiSlider.get();
    img.style.filter = `${filters[index]}(${effectLevelValue.value}${filtersOfValue[index]})`;
  });
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
  if (slider.noUiSlider !== undefined) {
    slider.noUiSlider.destroy();
  }
  img.style.removeProperty('filter');
  img.classList.remove(`effects__preview--${currentEffect}`);
  img.style.transform = 'scale(1)';
  scaleValue.value = '100%';
};

function escImgUpload(evt) {
  if (evt.keyCode === 27) {
    closeImgUpload();
  }
}

const fun = (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
};
const showImgUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadCancel.addEventListener('click', closeImgUpload);
  document.body.addEventListener('keydown', escImgUpload);
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
};

imgUploadInput.addEventListener('change', showImgUpload);
