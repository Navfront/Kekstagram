import { renderPhotos } from './preview.js';
import { editorInit } from './editor.js';

const picturesBlock = document.querySelector('.pictures');
const uploadInput = document.querySelector('#upload-file');

renderPhotos(picturesBlock);
editorInit(uploadInput);
