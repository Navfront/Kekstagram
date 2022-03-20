import { openModal } from './modal.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const liveCommentsArray = socialComments.children;
const commentTemplate = liveCommentsArray[0].cloneNode(true);
const commentAvatar = commentTemplate.querySelector('.social__picture');
const commentMessage = commentTemplate.querySelector('.social__text');

const photoClickHandler = (photo, pictureData) => {
  return photoZoomer.bind(null, photo, pictureData);
};

const photoZoomer = (photo, pictureData) => {
  const commentsArray = pictureData.comments;
  const commentsFragment = document.createDocumentFragment();

  for (let i = liveCommentsArray.length - 1; i >= 0; i--) {
    liveCommentsArray[i].remove();
  }

  commentsArray.forEach((commentData) => {
    commentAvatar.src = commentData.avatar;
    commentAvatar.alt = commentData.name;
    commentMessage.textContent = commentData.message;
    let newComment = commentTemplate.cloneNode(true);
    commentsFragment.appendChild(newComment);
  });

  socialComments.appendChild(commentsFragment);

  bigPictureImg.src = pictureData.url;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = commentsArray.length;
  socialCaption.textContent = pictureData.description;

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  openModal(bigPicture);
};

export { photoClickHandler };
