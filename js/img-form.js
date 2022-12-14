const EFFECTS = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness'
};
const UNITS_FOR_EFFECTS = {
  'chrome': '',
  'sepia': '',
  'marvin': '%',
  'phobos': 'px',
  'heat': '',
};
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const SLIDER_FORMAT = {
  to: function (value) {
    if (Number.isInteger(value)) {
      return value.toFixed(0);
    }
    return value.toFixed(1);
  },
  from: function (value) {
    return parseFloat(value);
  },
};
const SLIDER_OPTIONS = {
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    format: SLIDER_FORMAT,
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    format: SLIDER_FORMAT,
  },
  'marvin': {
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
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    format: SLIDER_FORMAT,
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    format: SLIDER_FORMAT,
  }
};
const STEP_SCALE = 0.25;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;

const fileInput = document.querySelector('#upload-file');
const imgEditingForm = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const reduceButton = document.querySelector('.scale__control--smaller');
const enlargeButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const img = imgPreview.querySelector('img');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('input[name="effect-level"]');
const slider = effectLevel.querySelector('.effect-level__slider');
const radiosEffect = document.querySelectorAll('input[name="effect"]');
const previewsEffect = document.querySelectorAll('.effects__preview');

let valueOfTransform = 1;
let currentEffect = 'none';

const onEffectButtonClick = (evt) => {
  img.classList.remove(`effects__preview--${currentEffect}`);
  img.classList.add(`effects__preview--${evt.target.value}`);
  currentEffect = evt.target.value;

  if (slider.noUiSlider === undefined) {
    if (evt.target.value !== 'none') {
      effectLevel.classList.remove('hidden');
      noUiSlider.create(slider, SLIDER_OPTIONS[evt.target.value]);
      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = slider.noUiSlider.get();
        img.style.filter = `${EFFECTS[evt.target.value]}(${effectLevelValue.value}${UNITS_FOR_EFFECTS[evt.target.value]})`;
      });
    }
  } else {
    if (evt.target.value !== 'none') {
      effectLevel.classList.remove('hidden');
      slider.noUiSlider.updateOptions(SLIDER_OPTIONS[evt.target.value]);
      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = slider.noUiSlider.get();
        img.style.filter = `${EFFECTS[evt.target.value]}(${effectLevelValue.value}${UNITS_FOR_EFFECTS[evt.target.value]})`;
      });
    } else {
      effectLevel.classList.add('hidden');
      slider.noUiSlider.destroy();
      img.style.removeProperty('filter');
    }
  }
};

const onReduceButtonClick =  () => {
  if (valueOfTransform > MIN_SCALE) {
    scaleValue.value = `${(valueOfTransform - STEP_SCALE) * 100}%`;
    img.style.transform = `scale(${valueOfTransform - STEP_SCALE})`;
    valueOfTransform -= STEP_SCALE;
  }
};

const onEnlargeButtonClick = () => {
  if (valueOfTransform < MAX_SCALE) {
    scaleValue.value = `${(valueOfTransform + STEP_SCALE) * 100}%`;
    img.style.transform = `scale(${valueOfTransform + STEP_SCALE})`;
    valueOfTransform += STEP_SCALE;
  }
};

const onCancelButtonClick = () => {
  imgEditingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInput.value = '';
  radiosEffect.forEach((radio) => {
    radio.removeEventListener('input', onEffectButtonClick);
  });
  reduceButton.removeEventListener('click', onReduceButtonClick);
  enlargeButton.removeEventListener('click', onEnlargeButtonClick);
  document.body.removeEventListener('keydown', onImgUploadEscape);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  if (slider.noUiSlider !== undefined) {
    slider.noUiSlider.destroy();
  }
  img.style.removeProperty('filter');
  img.classList.remove(`effects__preview--${currentEffect}`);
  img.style.transform = 'scale(1)';
  scaleValue.value = '100%';
  commentInput.value = '';
  hashtagInput.value = '';
  document.querySelector('input[value="none"]').checked = true;
};

const closeImgUploadWithSaving = () => {
  imgEditingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInput.value = '';
  radiosEffect.forEach((radio) => {
    radio.removeEventListener('input', onEffectButtonClick);
  });
  reduceButton.removeEventListener('click', onReduceButtonClick);
  enlargeButton.removeEventListener('click', onEnlargeButtonClick);
  document.body.removeEventListener('keydown', onImgUploadEscape);
  cancelButton.removeEventListener('click', onCancelButtonClick);
};

function onImgUploadEscape(evt) {
  if (evt.key === 'Escape') {
    onCancelButtonClick();
  }
}

const onInputKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};
const onFileInputChange = () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    img.src = URL.createObjectURL(file);
  }

  for (const preview of previewsEffect) {
    preview.style.backgroundImage = `url(${img.src})`;
  }
  effectLevel.classList.add('hidden');
  imgEditingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.body.addEventListener('keydown', onImgUploadEscape);
  reduceButton.addEventListener('click', onReduceButtonClick);
  enlargeButton.addEventListener('click', onEnlargeButtonClick);
  radiosEffect.forEach((radio) => {
    radio.addEventListener('input', onEffectButtonClick);
  });
  hashtagInput.addEventListener('focus', () => {
    hashtagInput.addEventListener('keydown', onInputKeydown);
  });
  hashtagInput.addEventListener('blur', () => {
    hashtagInput.removeEventListener('keydown', onInputKeydown);
  });
  commentInput.addEventListener('focus', () => {
    commentInput.addEventListener('keydown', onInputKeydown);
  });
  commentInput.addEventListener('blur', () => {
    commentInput.removeEventListener('keydown', onInputKeydown);
  });
};

fileInput.addEventListener('change', onFileInputChange);

export {onCancelButtonClick, closeImgUploadWithSaving};
