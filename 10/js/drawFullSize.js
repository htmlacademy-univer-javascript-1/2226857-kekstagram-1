const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img').querySelector('img');
const commentTemplate = bigPicture.querySelector('#comment-template').content;
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

const clickPicture = (picture, pictureDescription) => {
  picture.querySelector('.picture__img').addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    image.src = pictureDescription.url;
    bigPicture.querySelector('.likes-count').textContent = pictureDescription.likes;
    bigPicture.querySelector('.comments-count').textContent = pictureDescription.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pictureDescription.description;
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    const commentsPicture = bigPicture.querySelector('.social__comments');
    while (commentsPicture.firstChild) {
      commentsPicture.removeChild(commentsPicture.firstChild);
    }
    pictureDescription.comments.forEach((comment) => {

      const socialComment = commentTemplate.cloneNode(true);
      const commentAvatar = socialComment.querySelector('img');
      commentAvatar.src = comment.avatar;
      commentAvatar.alt = comment.name;
      socialComment.querySelector('p').textContent = comment.message;
      commentsPicture.appendChild(socialComment);
    });
    document.body.classList.add('modal-open');
  });
};

export {clickPicture};
