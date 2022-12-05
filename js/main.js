import './drawThumbnail.js';
import './drawFullSize.js';
import './validForm.js';
import './imgForm.js';
import {createPictures} from './drawThumbnail.js';
import {getData} from './api.js';
import { showAlert } from './util.js';

getData((pictures) => {
  createPictures(pictures);
}, showAlert);
