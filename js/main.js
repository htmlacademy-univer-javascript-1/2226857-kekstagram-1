function randomInteger(min, max) {
  if (min < 0 || max < 0 || max <= min) {
    return null;
  }
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function checkForMaxLength(testString, maxLength) {
  return testString.legth <= maxLength;
}
