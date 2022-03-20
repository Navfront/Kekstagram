import { openModal } from './modal.js';

const photoParams = {
  currentScale: 1,
  filter: 'none',
  units: '',
  value: 1,
};

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

const stylePhoto = (photo, photoParams) => {
  photo.style = `filter:${photoParams.filter}(${photoParams.value}${photoParams.units}); transform: scale(${photoParams.currentScale})`;
};

const chooseEffect = (photoParams) => {
  return (evt) => {
    switch (evt.target.value) {
      case 'chrome':
        photoParams.filter = 'chrome';
        showSlider(slider).noUiSlider.on('update', (value) => {
          photoParams.value = value[0];
          photoParams.filter = 'grayscale';
          photoParams.units = '';
          stylePhoto(photo, photoParams);
        });
        break;

      case 'sepia':
        photoParams.filter = 'sepia';
        showSlider(slider).noUiSlider.on('update', (value) => {
          photoParams.value = value[0];
          photoParams.filter = 'sepia';
          photoParams.units = '';
          stylePhoto(photo, photoParams);
        });
        break;

      case 'marvin':
        photoParams.filter = 'marvin';
        showSlider(slider, 0, 100, 1).noUiSlider.on('update', (value) => {
          photoParams.value = value[0];
          photoParams.filter = 'invert';
          photoParams.units = '%';
          stylePhoto(photo, photoParams);
        });
        break;

      case 'phobos':
        photoParams.filter = 'phobos';
        showSlider(slider, 0, 3, 0.1).noUiSlider.on('update', (value) => {
          photoParams.value = value[0];
          photoParams.filter = 'blur';
          photoParams.units = 'px';
          stylePhoto(photo, photoParams);
        });
        break;

      case 'heat':
        photoParams.filter = 'heat';
        showSlider(slider, 0, 3, 0.1).noUiSlider.on('update', (value) => {
          photoParams.value = value[0];
          photoParams.filter = 'brightness';
          photoParams.units = '';
          stylePhoto(photo, photoParams);
        });
        break;

      default:
        destroySlider(slider);
        photo.style = '';
        break;
    }
  };
};

const initScaleer = (photoParams) => {
  scaleControlValue.value = `${photoParams.currentScale * 100}%`;
  scaleControlBigger.addEventListener('click', scaleOnce(true, photoParams));
  scaleControlSmaller.addEventListener('click', scaleOnce(false, photoParams));
  stylePhoto(photo, photoParams);
};

const scaleOnce = (bool, photoParams) => {
  return () => {
    if (bool) {
      if (photoParams.currentScale <= 0.75) {
        photoParams.currentScale += 0.25;
      }
      stylePhoto(photo, photoParams);
      scaleControlValue.value = `${photoParams.currentScale * 100}%`;
    } else {
      if (photoParams.currentScale >= 0.5) {
        photoParams.currentScale -= 0.25;
      }
      stylePhoto(photo, photoParams);
      scaleControlValue.value = `${photoParams.currentScale * 100}%`;
    }
  };
};

const addEventsToCollectionElements = (collection, photoParams) => {
  collection.forEach((elem) => {
    elem.addEventListener('change', chooseEffect(photoParams));
  });
};

const editor = () => {
  stylePhoto(photo, photoParams);
  openModal(editorModal);
  initScaleer(photoParams);
  addEventsToCollectionElements(radioEffectBtns, photoParams);
};

const showSlider = (slider, min = 0, max = 1, step = 0.1) => {
  destroySlider(slider);
  sliderLayout.classList.remove('hidden');
  noUiSlider.create(slider, {
    start: max,
    connect: true,
    step,
    range: {
      min,
      max,
    },
  });

  return slider;
};

const destroySlider = (slider) => {
  if (slider.innerHTML) {
    slider.noUiSlider.destroy();
  }

  sliderLayout.classList.add('hidden');
};

export { editorInit };
