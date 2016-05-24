export default class Alphanumeric{
  constructor(lang = 'en') {
    this.lang = lang;
  }

  number() {
    return Math.random();
  }
}
