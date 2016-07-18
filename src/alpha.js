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
  }

  numerify(pattern) {
    return pattern.replace(/#/g, this.randomNumber({ min: 0, max: 9 }));
  }
}
