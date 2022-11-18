const form = document.querySelector('#upload-select-image');
const text = document.querySelector('.text__hashtags');

const pristine = new Pristine(form);

function validHashtagsAmount(hashtags) {
  return hashtags.split(' ').length < 6;
}

pristine.addValidator(
  text,
  validHashtagsAmount
);

function validHashtags(hashtags) {
  const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}( #[A-Za-zА-яа-яЁё0-9]{1,19}){0,4}$/;
  return re.test(hashtags) || hashtags == '';
}

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

