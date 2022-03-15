'use strict'

const DESCRIPTIONS = [
  'Безжизненная база',
  'Равнинные снега',
  'Лесные руины',
  'Снежная деревня',
  'Заражённая пещера',
  'Адский шелест',
  'Населённая тундра',
  'Пещерный лес',
  'Уничтоженный кратор',
  'Вынос Мусора',
  'Становая Тяга',
  'Пылесосение',
  'Поливание Цветов',
  'Катание Асфальта',
  'Прыжок С Парашютом',
  'Бирманцами диатомит бонзою гарантированных ловись',
  'Преставлением потрескавшись апостол дипломниц германец',
  'Людской скрестившую завлекаю почечное просторно приемосдатчицам',
  'Соболезнуя занавески серединных закуренною людным левада',
  'Знаем безвреднее устремлённо саркастических закидавшем',
  'Обогатившись невид зеленщик несимметричный похва садовниками',
  'Обжаривавшею эван мягкое',
  'Предостерегаю влекут растворенную инспектирующее торфозаготовительная',
  'Сельповском сбивайте восхищался размежеван заинвентаризована возгласов',
  'Охлаждавшемся кулька прорезают редкоземельное амфорою сотников интересною',
  'Капернаумов антропофаг зазмеившийся обещался нагромождающего',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USER_NAMES = [
  'Termit',
  'Аки',
  'TeReMok',
  '3Jlou_4uTep',
  '♠ БеZуМныЙ ♠',
  'CHefir',
  'Кармен',
  '~Ђ0ЂЁP~',
  'ВзгЛяд в НикУдА',
  'Алеша подай патрон',
  'Кармен',
  'Dr0zd',
  'Таомаг',
  'Blueberry',
  'KoTuk',
  'CmeTanKa',
  '4EлovЕК',
];

const ARRAY_LENGTH = 25;

const MAX_AVATARS = 6

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

const randomNumbersArray = function (arrayLength) {
  let result = [];
  let randNumb;
  for (let i = arrayLength; i > 0; i--){
    do {
      randNumb = Math.floor(Math.random() * arrayLength + 1)
    } while  (result.some((value) => {
      return value === randNumb
    }));
    result.push(randNumb)

  }
  return result;
}

const COMMENTS_IDS_ARRAY = randomNumbersArray(100);

const createComment = function ( usernames, comments) {
  let comment = {
    id: COMMENTS_IDS_ARRAY.pop(),
    avatar: `img/avatar-${getRandomArbitrary(0, MAX_AVATARS - 1)}.svg`,
    message: comments[getRandomArbitrary(0, comments.length - 1)],
    name: usernames[getRandomArbitrary(0, usernames.length - 1)],
  }
  return comment
}

const createCommentsArray = function (maxCommentsNumber) {
  let randLength = getRandomArbitrary(0, maxCommentsNumber);
  let result = [];
  for (let i = 0; i <= randLength; i++){
    result.push(createComment(USER_NAMES, COMMENTS))
  }
  return result
}

const createPhotoArray = function (arrayLength, descriptions) {
  let randNumbersArr = randomNumbersArray(arrayLength);
  let randNumbersArr2 = randomNumbersArray(arrayLength);


  let result = new Array(arrayLength).fill(null).map((value, idx) => {
    return {
      id: idx,
      url: `photos/${randNumbersArr[idx]}.jpg`,
      description: descriptions[randNumbersArr2[idx]],
      likes: getRandomArbitrary(15, 200),
      comments: createCommentsArray(3),
    }
  })
  return result
}

createPhotoArray(ARRAY_LENGTH, DESCRIPTIONS, USER_NAMES, COMMENTS);







getRandomArbitrary(20, 40);
isStringLengthOk('some string', 15);
