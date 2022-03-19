import { getRandomUniqueNumber, getRandomIntInclusive } from './util.js';

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
  'Давай еще!!!',
  'Это пять!',
  'Мой кот сделает лучше',
  'Очень странное фото..',
  'ОМГ.',
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'На что снимал?',
  'Пусть это будет последнее, что я видел здесь',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я подскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTS_IDS_COUNT = 100;

const ARRAY_LENGTH = 25;

const MAX_AVATARS = 6;

const MAX_COMMENTS_IN_PHOTO = 3;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const getDescriptionUniqId = getRandomUniqueNumber(0, DESCRIPTIONS.length - 1);
const getRandomUniqueDescription = () => {
  return DESCRIPTIONS[getDescriptionUniqId()];
};

const getUniqId = getRandomUniqueNumber(0, COMMENTS_IDS_COUNT);

const createComment = () => {
  let comment = {
    id: getUniqId(),
    avatar: `img/avatar-${getRandomIntInclusive(1, MAX_AVATARS)}.svg`,
    message: COMMENTS[getRandomIntInclusive(0, COMMENTS.length - 1)],
    name: USER_NAMES[getRandomIntInclusive(0, USER_NAMES.length - 1)],
  };
  return comment;
};

const createPhotoArray = (arrayLength = ARRAY_LENGTH, maxCommentsPerPhoto = MAX_COMMENTS_IN_PHOTO) => {
  let getUniqPhotoNumber = getRandomUniqueNumber(1, arrayLength);
  let result = new Array(arrayLength).fill(null).map((value, idx) => {
    let commentsArray = [];
    for (let i = 0; i < getRandomIntInclusive(0, maxCommentsPerPhoto); i++) {
      commentsArray.push(createComment());
    }
    return {
      id: idx + 1,
      url: `photos/${getUniqPhotoNumber()}.jpg`,
      description: getRandomUniqueDescription(),
      likes: getRandomIntInclusive(Likes.MIN, Likes.MAX),
      comments: commentsArray,
    };
  });
  return result;
};

export { createPhotoArray, createComment };
