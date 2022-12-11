import { clickPicture } from './drawFullSize.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const buttonDefault = document.querySelector('button[id="filter-default"]');
const buttonRandom = document.querySelector('button[id="filter-random"]');
const buttonDiscussed = document.querySelector('button[id="filter-discussed"]');

const setDefaultClick = (cb) => {
  buttonDefault.addEventListener('click', () => {
    cb();
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
    buttonDefault.classList.add('img-filters__button--active');
  });
};

const setRandomClick = (cb) => {
  buttonRandom.addEventListener('click', () => {
    cb();
    buttonDefault.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
    buttonRandom.classList.add('img-filters__button--active');
  });
};

const setDiscussedClick = (cb) => {
  buttonDiscussed.addEventListener('click', () => {
    cb();
    buttonDefault.classList.remove('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.add('img-filters__button--active');
  });
};

const compareDiscussed = (pictureA, pictureB) => {
  const countA = pictureA.comments.length;
  const countB = pictureB.comments.length;
  return countB - countA;
};

const compareRandom = () => 0.5 - Math.random();

const createPictures = (descriptions, compare) => {
  const pictureListFragment = document.createDocumentFragment();
  const removed = document.querySelectorAll('a[class="picture"]');
  for (const elem of removed) {
    elem.remove();
  }
  switch (compare) {
    case 'default':
      descriptions
        .slice()
        .forEach(({url, likes, comments, description}) => {
          const pictureElement = pictureTemplate.cloneNode(true);
          pictureElement.querySelector('.picture__img').src = url;
          pictureElement.querySelector('.picture__likes').textContent = likes;
          pictureElement.querySelector('.picture__comments').textContent = comments.length;
          clickPicture(pictureElement, {url, likes, comments, description});
          pictureListFragment.appendChild(pictureElement);
        });
      break;
    case 'random':
      descriptions
        .slice()
        .sort(compareRandom)
        .slice(0, 10)
        .forEach(({url, likes, comments, description}) => {
          const pictureElement = pictureTemplate.cloneNode(true);
          pictureElement.querySelector('.picture__img').src = url;
          pictureElement.querySelector('.picture__likes').textContent = likes;
          pictureElement.querySelector('.picture__comments').textContent = comments.length;
          clickPicture(pictureElement, {url, likes, comments, description});
          pictureListFragment.appendChild(pictureElement);
        });
      break;
    case 'discussed':
      descriptions
        .slice()
        .sort(compareDiscussed)
        .forEach(({url, likes, comments, description}) => {
          const pictureElement = pictureTemplate.cloneNode(true);
          pictureElement.querySelector('.picture__img').src = url;
          pictureElement.querySelector('.picture__likes').textContent = likes;
          pictureElement.querySelector('.picture__comments').textContent = comments.length;
          clickPicture(pictureElement, {url, likes, comments, description});
          pictureListFragment.appendChild(pictureElement);
        });
      break;
  }
  pictureList.appendChild(pictureListFragment);
};

export {createPictures, setDefaultClick, setRandomClick, setDiscussedClick};
