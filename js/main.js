import './draw-thumbnail.js';
import './draw-full-size.js';
import './valid-form.js';
import './img-form.js';
import {createAllPictures, createDefaultButton, createDiscussedButton, createRandomButton, } from './draw-thumbnail.js';
import {getData} from './api.js';
import { debounce, showAlert } from './util.js';

getData((pictures) => {
  createAllPictures(pictures, 'default');
  createDefaultButton(debounce(
    () => createAllPictures(pictures, 'default'),
  ));
  createDiscussedButton(debounce(
    () => createAllPictures(pictures, 'discussed'),
  ));
  createRandomButton(debounce(
    () => createAllPictures(pictures, 'random'),
  ));
}, showAlert);
