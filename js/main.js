'use strict'

const getRandomArbitrary = (min, max) => {
  if (min < 0 || max < 0 ) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.round(Math.floor(Math.random() * (max - min + 1) + min));
};



const isStringLengthOk = (text, maxLength) => {
  return text.length <= maxLength
};


getRandomArbitrary(20, 40);
isStringLengthOk('some string', 15);
