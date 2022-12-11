import './drawThumbnail.js';
import './drawFullSize.js';
import './validForm.js';
import './imgForm.js';
import {createPictures, setDefaultClick, setDiscussedClick, setRandomClick} from './drawThumbnail.js';
import {getData} from './api.js';
import { debounce, showAlert } from './util.js';


getData((pictures) => {
  createPictures(pictures, 'default');
  setDefaultClick(debounce(
    () => createPictures(pictures, 'default'),
  ));
  setDiscussedClick(debounce(
    () => createPictures(pictures, 'discussed'),
  ));
  setRandomClick(debounce(
    () => createPictures(pictures, 'random'),
  ));
}, showAlert);
document.querySelector('.img-filters').classList.remove('img-filters--inactive');
