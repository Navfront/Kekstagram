const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomUniqueNumber = (min, max) => {
  let checkArr = [];

  return () => {
    let currentValue = getRandomIntInclusive(min, max);
    if (checkArr.length >= max - min + 1) {
      throw new Error('Превышен лимит рандомных чисел');
    }

    while (checkArr.includes(currentValue)) {
      currentValue = getRandomIntInclusive(min, max);
    }
    checkArr.push(currentValue);
    return currentValue;
  };
};

const isStringLengthOk = (text, maxLength) => {
  return text.length <= maxLength;
};

export { getRandomUniqueNumber, isStringLengthOk, getRandomIntInclusive };
