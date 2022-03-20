import { openModal } from './modal.js';

const editorModal = document.querySelector('.img-upload__overlay');
const sliderLayout = editorModal.querySelector('.effect-level');
const slider = sliderLayout.querySelector('.effect-level__slider');
const radioEffectBtns = editorModal.querySelectorAll('.effects__radio');
const photo = editorModal.querySelector('.img-upload__preview > img');
const scaleControlSmaller = editorModal.querySelector('.scale__control--smaller');
const scaleControlBigger = editorModal.querySelector('.scale__control--bigger');
const scaleControlValue = editorModal.querySelector('.scale__control--value');

const editorInit = (uploadInput) => {
  uploadInput.addEventListener('click', uploadInputHandler);
};

const uploadInputHandler = (evt) => {
  evt.preventDefault();
  editor();
};

const chooseEffect = () => {
  return (evt) => {
    switch (evt.target.value) {
      case 'chrome':
        showSlider(slider);
        photo.style = 'filter: grayscale(1)';
        break;

      default:
        destroySlider(slider);
        break;
    }
  };
};

const initScaleer = (photoParams) => {
  scaleControlValue.value = `${photoParams.currentScale}%`;
  scaleControlBigger.addEventListener('click', scaleOnce(true, photoParams));
  scaleControlSmaller.addEventListener('click', scaleOnce(false, photoParams));
  photo.style = `transform: scale(${photoParams.currentScale / 100})`;
};

const scaleOnce = (bool, photoParams) => {
  return () => {
    if (bool) {
      if (photoParams.currentScale <= 75) {
        photoParams.currentScale += 25;
      }
      photo.style = `transform: scale(${photoParams.currentScale / 100})`;
      scaleControlValue.value = `${photoParams.currentScale}%`;
    } else {
      if (photoParams.currentScale >= 50) {
        photoParams.currentScale -= 25;
      }
      photo.style = `transform: scale(${photoParams.currentScale / 100})`;
      scaleControlValue.value = `${photoParams.currentScale}%`;
    }
  };
};

const addEventsToCollectionElements = (collection) => {
  collection.forEach((elem) => {
    elem.addEventListener('change', chooseEffect());
  });
};

const editor = () => {
  const photoParams = {
    currentScale: 100,
  };
  openModal(editorModal);
  initScaleer(photoParams);
  addEventsToCollectionElements(radioEffectBtns);
  chooseEffect();
};

const showSlider = (slider) => {
  if (slider.innerHTML) {
    destroySlider(slider);
  }
  sliderLayout.classList.remove('hidden');
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
  sliderLayout.classList.add('hidden');
};

export { editorInit };
