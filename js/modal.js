import { removeStopPropagationOnInputs } from './util.js';
import { validateInputs } from './validation.js';

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const pageBody = document.querySelector('body');

const closeModalHandler = (modal, closeModalBtn) => {
  return closeModal.bind(null, modal, closeModalBtn);
};

const closeModal = (modal, closeBtn) => {
  const hashTagInput = modal.querySelector('.text__hashtags');
  const commentInput = modal.querySelector('.text__description');
  if (modal.classList.contains('img-upload__overlay')) {
    document.querySelector('#upload-file').value = '';
  }
  modal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  removeStopPropagationOnInputs(hashTagInput, commentInput);
  closeBtn.removeEventListener('click', closeModal);
};

const openModal = (modal) => {
  const closeModalBtn = modal.querySelector('.cancel');
  validateInputs(modal);
  closeModalBtn.addEventListener('click', closeModalHandler(modal, closeModalBtn));

  pageBody.addEventListener('keydown', (evt) => {
    if (evt.key === Keys.ESC || evt.key === Keys.ESCAPE) {
      closeModal(modal, closeModalBtn);
    }
  });

  pageBody.classList.add('modal-open');
  modal.classList.remove('hidden');
};

export { openModal, closeModal };
