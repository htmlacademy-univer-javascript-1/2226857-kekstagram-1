// https://learn.javascript.ru/task/random-int-min-max
// eslint-disable-next-line no-unused-vars
function randomInteger(min, max) {
  if (min < 0 || max < 0 || max <= min) {
    return null;
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// eslint-disable-next-line no-unused-vars
function checkForMaxLength(testString, maxLength) {
  return testString.legth <= maxLength;
}
