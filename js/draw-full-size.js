const COMMENT_FOR_ADDITION = 5;

const bigPicture = document.querySelector('.big-picture');
const commentTemplate = bigPicture.querySelector('#comment-template').content;
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsPicture = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');

let count;

const onCommentsLoaderClick = () => {
  let i = count;
  count += COMMENT_FOR_ADDITION;
  if (Number(commentsCount.textContent) <= COMMENT_FOR_ADDITION || Number(commentsCount.textContent) <= count) {
    count = Number(commentsCount.textContent);
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  bigPicture.querySelector('.social__comment-count').textContent = `${count} из ${commentsCount.textContent}`;
  for (i; i < count; i++) {
    commentsPicture.children[i].classList.remove('hidden');
  }
};

const onBigPictureCancelClick = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  document.body.removeEventListener('keydown', onBigPictureEscape);
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
};

function onBigPictureEscape(evt) {
  if (evt.key === 'Escape') {
    onBigPictureCancelClick();
  }
}

const showBigPicture = (picture, pictureDescription) => {
  picture.querySelector('.picture__img').addEventListener('click', () => {
    count = 0;
    commentsCount.textContent = pictureDescription.comments.length;
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureDescription.url;
    bigPicture.querySelector('.likes-count').textContent = pictureDescription.likes;
    bigPicture.querySelector('.social__caption').textContent = pictureDescription.description;
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

    for (let i = 0; i < Number(commentsCount.textContent); i++) {
      commentsPicture.children[i].classList.add('hidden');
    }
    onCommentsLoaderClick();
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
    document.body.addEventListener('keydown', onBigPictureEscape);
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    document.body.classList.add('modal-open');
  });
};

export { showBigPicture };
