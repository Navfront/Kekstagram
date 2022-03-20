import { renderPhotos } from './preview.js';
import { uploadInit } from './uploader.js';

const uploadInput = document.querySelector('#upload-file');

uploadInit(uploadInput);

const picturesBlock = document.querySelector('.pictures');
renderPhotos(picturesBlock);
