const COMMENT_MAX_LENGTH = 140;

const validate = {
  inputsStorage: [],

  addValidation: function (inputElement, handleFunction, typeOfEventListener = 'input') {
    this.inputsStorage.push({ inputElement, handleFunction, typeOfEventListener });
    inputElement.addEventListener(typeOfEventListener, handleFunction);
  },

  getHandleFunctionOfInput: function (inputElement) {
    return this.inputsStorage.find((item) => item.inputElement === inputElement).handleFunction;
  },

  removeValidation: function (inputElement, typeOfEventListener = 'input') {
    inputElement.removeEventListener(typeOfEventListener, this.getHandleFunctionOfInput(inputElement));
  },

  getValidInputs: function () {
    return this.inputsStorage;
  },

  handleHashTagInput: function (evt) {
    const regExTemplate = /\W/gi;
    let error = '';

    let hashTagsArray = evt.target.value.trim().split(' ');
    const testElement = evt.target;

    hashTagsArray.forEach((hashTag) => {
      if (hashTagsArray.length > 5) {
        error = 'Максимальное количество HashTag = 5';
        this.useCustomValidity(testElement, error);
      } else if (this.searchOfTwinsInArray(hashTagsArray)) {
        error = 'Нельзя повторять HashTag!';
        this.useCustomValidity(testElement, error);
      } else if (hashTag.length < 2 && hashTagsArray > 0) {
        error = 'HashTag должен быть как минимум пару символов!';
        this.useCustomValidity(testElement, error);
      } else if (hashTag.length > 20) {
        error = 'HashTag должен быть не более 20 символов!';
        this.useCustomValidity(testElement, error);
      } else if (regExTemplate.test(hashTag.slice(1))) {
        error = 'HashTag не должен содержать спецсимволы!';
        this.useCustomValidity(testElement, error);
      } else if (hashTag[0] !== '#') {
        error = 'HashTag должен начинаться с #';
        this.useCustomValidity(testElement, error);
      } else {
        error = '';
        this.useCustomValidity(testElement, error);
      }
    });
  },

  handleCommentInput: function (evt) {
    const testElement = evt.target;
    let symbolsCount = testElement.value.length;
    if (symbolsCount > COMMENT_MAX_LENGTH - 10 && symbolsCount <= COMMENT_MAX_LENGTH) {
      this.useCustomValidity(testElement, `У вас осталось ${COMMENT_MAX_LENGTH - symbolsCount} символов`);
    } else {
      this.useCustomValidity(testElement, '');
    }
  },

  useCustomValidity: function (element, errorMessage) {
    if (errorMessage) {
      element.setCustomValidity(errorMessage);
      element.reportValidity();
    } else {
      element.setCustomValidity('');
    }
  },

  searchOfTwinsInArray: function (array) {
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
  },
};

export { validate };
