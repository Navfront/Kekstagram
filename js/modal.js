const pageBody = document.querySelector('body');

const closeModalHandler = (modal, closeModalBtn) => {
  return closeModal.bind(null, modal, closeModalBtn);
};

const closeModal = (modal, closeBtn) => {
  if (modal.classList.contains('img-upload__overlay')) {
    document.querySelector('#upload-file').value = '';
  }
  modal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  closeBtn.removeEventListener('click', closeModal);
};

const openModal = (modal) => {
  const closeModalBtn = modal.querySelector('.cancel');
  closeModalBtn.addEventListener('click', closeModalHandler(modal, closeModalBtn));

  pageBody.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeModal(modal);
    }
  });

  pageBody.classList.add('modal-open');
  modal.classList.remove('hidden');
};

export { openModal, closeModal };
