import { renderPhotos } from './preview.js';
import { editorInit } from './editor.js';

const uploadInput = document.querySelector('#upload-file');

editorInit(uploadInput);

const picturesBlock = document.querySelector('.pictures');
renderPhotos(picturesBlock);
