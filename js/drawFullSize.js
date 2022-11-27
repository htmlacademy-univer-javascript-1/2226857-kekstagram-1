const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img').querySelector('img');
const commentTemplate = bigPicture.querySelector('#comment-template').content;
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsPicture = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');

const clickPictureListener = (picture, pictureDescription) => {
  picture.querySelector('.picture__img').addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    image.src = pictureDescription.url;
    bigPicture.querySelector('.likes-count').textContent = pictureDescription.likes;
    commentsCount.textContent = pictureDescription.comments.length;
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
    const lengthComments = Number(commentsCount.textContent);
    let count = 0;
    for (let i = 0; i < lengthComments; i++) {
      commentsPicture.children[i].classList.add('hidden');
    }
    const addComments = () => {
      let i = count;
      count += 5;
      if (lengthComments <= 5 || lengthComments <= count) {
        count = lengthComments;
        commentsLoader.classList.add('hidden');
      } else {
        commentsLoader.classList.remove('hidden');
      }
      socialCommentCount.textContent = `${count} из ${commentsCount.textContent}`;
      for (i; i < count; i++) {
        commentsPicture.children[i].classList.remove('hidden');
      }
    };

    addComments();

    const closeBigPicture = () => {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      commentsLoader.removeEventListener('click', addComments);
      document.body.removeEventListener('keydown', escBigPicture);
      bigPictureCancel.removeEventListener('click', closeBigPicture);
    };

    function escBigPicture(evt) {
      if (evt.keyCode === 27) {
        closeBigPicture();
      }
    }

    commentsLoader.addEventListener('click', addComments);

    document.body.addEventListener('keydown', escBigPicture);

    bigPictureCancel.addEventListener('click', closeBigPicture);

    document.body.classList.add('modal-open');
  });
};

export {clickPictureListener as clickPicture};
