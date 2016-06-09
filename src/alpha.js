function getRandomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}

export default class Alphanumeric {
  constructor(lang = 'en') {
    this.lang = lang;
  }

  randomNumber(min = 0, max = 1000) {
    return Math.floor(getRandomNumber(min, max));
  }

  randomFloat(min = 0, max = 1000, precision = 5) {
    return (getRandomNumber(min, max)).toPrecision(precision);
  }

  listOfRandomNumbers(length = 100, min = 0, max = 1000) {
    return new Array(length).fill(this.randomNumber(min, max));
  }
}
