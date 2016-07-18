function getRandomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}

export default class Alphanumeric {
  constructor(lang = 'us') {
    this.lang = lang;
  }

  randomNumber(params = { min: 0, max: 1000 }) {
    const min = params.min ? params.min : 0;
    const max = params.max ? params.max : 1000;
    return Math.floor(getRandomNumber(min, max));
  }

  randomFloat(params = { min: 0, max: 1000, precision: 5 }) {
    const min = params.min ? params.min : 0;
    const max = params.max ? params.max : 1000;
    const precision = params.precision ? params.precision : 5;
    return (getRandomNumber(min, max)).toPrecision(precision);
  }

  listOfRandomNumbers(params = { amount: 100, min: 0, max: 1000 }) {
    const min = params.min ? params.min : 0;
    const max = params.max ? params.max : 1000;
    const amount = params.amount ? params.amount : 5;
    return new Array(amount).fill(this.randomNumber({ min, max }));
  }

  listOfRandomFloats(params = { amount: 100, min: 0, max: 1000, precision: 5 }) {
    const min = params.min ? params.min : 0;
    const max = params.max ? params.max : 1000;
    const amount = params.amount ? params.amount : 5;
    const precision = params.precision ? params.precision : 5;
    return new Array(amount).fill(this.randomFloat({ min, max, precision }));
  }

  string(params = {}) {
    const from = params.from ? params.from :
      '0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
    const amount = params.max ? params.max : 30;
    const charsArray = [];
    for (let index = 0; index < amount; index++) {
      charsArray.push(from[this.randomNumber({ min: 0, max: from.length - 1 })]);
    }
    return charsArray.join('');
  }

  letterify(pattern) {
    return pattern.replace(/\?/g, this.string({ max: 1 }));
  }

  numerify(pattern) {
    return pattern.replace(/#/g, this.randomNumber({ min: 0, max: 9 }));
  }

  botify(pattern) {
    return this.letterify(this.numerify(pattern));
  }

  randomHash(length = 40) {
    return this.string({ from: '0123456789abcdef', max: length });
  }

  randomGuid(version = 5) {
    const guidPool = 'abcdef1234567890';
    const variantPool = 'ab89';
    return `${this.string({ from: guidPool, max: 8 })}-` +
      `${this.string({ from: guidPool, max: 4 })}-` +
      `${version}` +
      `${this.string({ from: guidPool, max: 3 })}-` +
      `${this.string({ from: variantPool, max: 1 })}` +
      `${this.string({ from: guidPool, max: 3 })}-` +
      `${this.string({ from: guidPool, max: 12 })}`;
  }
}
