import { openModal } from './modal.js';

const uploadModal = document.querySelector('.img-upload__overlay');
const slider = uploadModal.querySelector('.effect-level__slider');
const radioEffectBtns = uploadModal.querySelectorAll('.effects__radio');

const uploadInit = (uploadInput) => {
  uploadInput.addEventListener('click', uploadInputHandler);
};

const uploadInputHandler = (evt) => {
  evt.preventDefault();
  uploader();
};

const chooseEffect = () => {
  return (evt) => {
    if (evt.target.value !== 'none') {
      showSlider(slider);
    } else {
      destroySlider(slider);
    }
  };
};

const addEventsToCollectionElements = (collection) => {
  collection.forEach((elem) => {
    elem.addEventListener('change', chooseEffect());
  });
};

const uploader = () => {
  const photo = uploadModal.querySelector('.img-upload__preview > img');
  openModal(uploadModal);
  addEventsToCollectionElements(radioEffectBtns);
  chooseEffect(photo);
};

export { uploadInit };

const showSlider = (slider) => {
  if (slider.innerHTML) {
    destroySlider(slider);
  }

  noUiSlider.create(slider, {
    start: 50,
    connect: true,
    range: {
      min: 0,
      max: 100,
    },
  });

  slider.noUiSlider.on('change', () => {});
};

const destroySlider = (slider) => {
  slider.noUiSlider.destroy();
};
