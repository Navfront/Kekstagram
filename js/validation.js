const HASH_TAG_INPUT_CLASS = '.text__hashtags';
const COMMENT_INPUT = '.text__description';

const validateInputs = (parentElement) => {
  const hashTagInput = parentElement.querySelector(HASH_TAG_INPUT_CLASS);
  const commentTextArea = parentElement.querySelector(COMMENT_INPUT);

  addValidatorOnHashTagsInput(hashTagInput);
  addTextAreaValidator(commentTextArea);
};

const useCustomValidity = (element, errorMessage) => {
  if (errorMessage) {
    element.setCustomValidity(errorMessage);
    element.reportValidity();
  } else {
    element.setCustomValidity('');
  }
};

const searchOfTwinsInArray = (array) => {
  let error = false;
  array.forEach((element, index) => {
    for (let i = 0; i < array.length; i++) {
      if (element === array[i] && index !== i && !error) {
        error = true;
        break;
      }
    }
  });
  return error;
};

const addValidatorOnHashTagsInput = (hashTagsInput) => {
  hashTagsInput.addEventListener('input', (evt) => {
    const regExTemplate = /\W/gi;
    let error = '';

    let hashTagsArray = hashTagsInput.value.trim().split(' ');
    const testElement = evt.target;

    hashTagsArray.forEach((hashTag) => {
      if (hashTagsArray.length > 5) {
        error = 'Максимальное количество HashTag = 5';
        useCustomValidity(testElement, error);
      } else if (searchOfTwinsInArray(hashTagsArray)) {
        error = 'Нельзя повторять HashTag!';
        useCustomValidity(testElement, error);
      } else if (hashTag.length < 2 && hashTagsArray > 0) {
        error = 'HashTag должен быть как минимум пару символов!';
        useCustomValidity(testElement, error);
      } else if (hashTag.length > 20) {
        error = 'HashTag должен быть не более 20 символов!';
        useCustomValidity(testElement, error);
      } else if (regExTemplate.test(hashTag.slice(1))) {
        error = 'HashTag не должен содержать спецсимволы!';
        useCustomValidity(testElement, error);
      } else if (hashTag[0] !== '#') {
        error = 'HashTag должен начинаться с #';
        useCustomValidity(testElement, error);
      } else {
        error = '';
        useCustomValidity(testElement, error);
      }
    });
  });
};

const addTextAreaValidator = (textArea) => {
  textArea.addEventListener('input', (evt) => {
    const testElement = evt.target;
    let symbolsCount = testElement.value.length;
    if (symbolsCount > 130 && symbolsCount <= 140) {
      useCustomValidity(testElement, `У вас осталось ${140 - symbolsCount} символов`);
    } else {
      useCustomValidity(testElement, '');
    }
  });
};

export { validateInputs };
