import { createPhotoArray } from './data.js';
import { photoClickHandler } from './photo-zoom.js';

const photoDataArray = createPhotoArray();
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const createPhoto = (photoData, template) => {
  const newPhoto = template.cloneNode(true);
  const img = newPhoto.querySelector('.picture__img');
  const commentsNumber = newPhoto.querySelector('.picture__comments');
  const likes = newPhoto.querySelector('.picture__likes');
  img.src = photoData.url;
  commentsNumber.textContent = photoData.comments.length;
  likes.textContent = photoData.likes;
  newPhoto.addEventListener('click', photoClickHandler(newPhoto, photoData));
  return newPhoto;
};

photoDataArray.forEach((photoData) => {
  picturesFragment.appendChild(createPhoto(photoData, photoTemplate));
});

const renderPhotos = (parent) => {
  parent.appendChild(picturesFragment);
};

export { renderPhotos };
