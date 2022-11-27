const form = document.querySelector('#upload-select-image');
const text = document.querySelector('.text__hashtags');

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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});
