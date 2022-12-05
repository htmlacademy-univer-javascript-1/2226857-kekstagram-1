import { clickPicture } from './drawFullSize.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();
const createPictures = (descriptions) => {
  descriptions.forEach(({url, likes, comments, description}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    clickPicture(pictureElement, {url, likes, comments, description});
    pictureListFragment.appendChild(pictureElement);
  });
  pictureList.appendChild(pictureListFragment);
};

export {createPictures};
