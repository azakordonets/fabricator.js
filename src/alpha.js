export default class Alphanumeric {
  constructor(lang = 'en') {
    this.lang = lang;
  }

  randomNumber(min = 0, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
