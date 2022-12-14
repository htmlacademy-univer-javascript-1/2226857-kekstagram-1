import {randomInteger} from './util.js';

const NAMES = [
  'Дима',
  'Димон',
  'Дмитрий',
  'Митрий',
  'Митя',
  'Олег',
  'Егор',
  'Николай',
  'Николя',
  'Георгий',
  'Гоша',
  'Паша',
  'Павел',
  'Антон',
  'Андрей',
  'Андрюха',
  'Вован'
];

const DESCRIPTIONS = [
  'Крутая картинка',
  'Прикольная пикча',
  'Хорошее фото',
  'Шедевральный снимок',
  'Шикарный вид',
  'Великолепный пейзаж',
  'Супер снимок',
  'Отличная фотография'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const arrayID = [];
const arrayIDComments = [];
const arrayURL = [];

const getRandomArrayElement = (elements) => elements[randomInteger(0, elements.length - 1)];

const getNewID = () => {
  let newId = randomInteger(1, 25);
  while (arrayID.includes(newId)) {
    newId = randomInteger(1, 25);
  }
  arrayID.push(newId);

  return newId;
};

const getNewIDComment = () => {
  let newIdComment = randomInteger(1, 1000);
  while (arrayIDComments.includes(newIdComment)) {
    newIdComment = randomInteger(1, 1000);
  }
  arrayIDComments.push(newIdComment);
  return newIdComment;
};

const getNewURL = () => {
  let newUrl = randomInteger(1, 25);
  while (arrayURL.includes(newUrl)) {
    newUrl = randomInteger(1, 25);
  }
  arrayURL.push(newUrl);

  return newUrl;
};

const createComments = (sizeOfArray) => {
  const arrayOfComments = [];

  for (let i = 0; i < sizeOfArray; i++) {
    const comment = {
      id: getNewIDComment(),
      avatar: `img/avatar-${  randomInteger(1,6)  }.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    };
    arrayOfComments.push(comment);
  }
  return arrayOfComments;
};

const createDescription = () => ({
  id: getNewID(),
  url: `photos/${  getNewURL()  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: randomInteger(15, 200),
  comments: createComments(randomInteger(1,20)),
});

const COUNT_OF_PHOTO_DESCRIPTION = 25;

const similarDescription = () => Array.from({length: COUNT_OF_PHOTO_DESCRIPTION}, createDescription);

export {similarDescription};
