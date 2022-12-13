import { showBigPicture } from './draw-full-size.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const defaultButton = document.querySelector('button[id="filter-default"]');
const randomButton = document.querySelector('button[id="filter-random"]');
const discussedButton = document.querySelector('button[id="filter-discussed"]');
const pictureListFragment = document.createDocumentFragment();

const createDefaultButton = (cb) => {
  defaultButton.addEventListener('click', () => {
    cb();
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
    defaultButton.classList.add('img-filters__button--active');
  });
};

const createRandomButton = (cb) => {
  randomButton.addEventListener('click', () => {
    cb();
    defaultButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
    randomButton.classList.add('img-filters__button--active');
  });
};

const createDiscussedButton = (cb) => {
  discussedButton.addEventListener('click', () => {
    cb();
    defaultButton.classList.remove('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.add('img-filters__button--active');
  });
};

const compareForDiscussed = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const compareForRandom = () => 0.5 - Math.random();

const createOnePicture = ({url, likes, comments, description}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  showBigPicture(pictureElement, {url, likes, comments, description});
  pictureListFragment.appendChild(pictureElement);
};

const createAllPictures = (descriptions, compare) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  const picturesForRemoved = document.querySelectorAll('a[class="picture"]');
  for (const picture of picturesForRemoved) {
    picture.remove();
  }
  switch (compare) {
    case 'default':
      descriptions
        .slice()
        .forEach(createOnePicture);
      break;
    case 'random':
      descriptions
        .slice()
        .sort(compareForRandom)
        .slice(0, 10)
        .forEach(createOnePicture);
      break;
    case 'discussed':
      descriptions
        .slice()
        .sort(compareForDiscussed)
        .forEach(createOnePicture);
      break;
  }
  pictureList.appendChild(pictureListFragment);
};

export { createAllPictures, createDefaultButton, createRandomButton, createDiscussedButton };
