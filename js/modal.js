import { removeStopPropagationOnInputs } from './util.js';
import { validate } from './validation.js';

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const pageBody = document.querySelector('body');

const closeModal = (modal, closeBtn) => {
  return () => {
    const hashTagInput = modal.querySelector('.text__hashtags');
    const commentInput = modal.querySelector('.text__description');
    if (modal.classList.contains('img-upload__overlay')) {
      document.querySelector('#upload-file').value = '';
    }

    if (hashTagInput && commentInput) {
      removeStopPropagationOnInputs(hashTagInput, commentInput);
      validate.removeValidation(hashTagInput);
      validate.removeValidation(commentInput);
    }
    modal.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    pageBody.removeEventListener('keydown', onKeyEscapeDown(modal));
    if (closeBtn) {
      closeBtn.removeEventListener('click', closeModal(modal));
    }
  };
};

const openModal = (modal) => {
  const closeModalBtn = modal.querySelector('.cancel');
  const hashTagInput = modal.querySelector('.text__hashtags');
  const commentInput = modal.querySelector('.text__description');
  validate.addValidation(hashTagInput, validate.handleHashTagInput);
  validate.addValidation(commentInput, validate.handleCommentInput);
  closeModalBtn.addEventListener('click', closeModal(modal, closeModalBtn));
  pageBody.addEventListener('keydown', onKeyEscapeDown(modal));
  pageBody.classList.add('modal-open');
  modal.classList.remove('hidden');
};

const onKeyEscapeDown = (modal) => {
  return (evt) => {
    if (evt.key === Keys.ESC || evt.key === Keys.ESCAPE) {
      closeModal(modal)();
    }
  };
};

export { openModal, closeModal };
