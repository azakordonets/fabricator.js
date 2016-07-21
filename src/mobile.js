import Alpha from './alpha';

export default class Mobile {

  constructor(lang = 'us') {
    this.lang = lang;
    this.alpha = new Alpha(this.lang);
  }

  androidGsmId() {
    return `APA91${this.alpha.string({ max: 178 })}`;
  }

  applePushToken() {
    return this.alpha.string({ from: 'abcdef1234567890', max: 64 });
  }

  wp8Anid2() {
    return new Buffer(this.alpha.string(), 'utf-8').toString();
  }

  wp7Anid() {
    return `A=${this.alpha.randomGuid().replace(/-/g, '').toUpperCase()}` +
        `&E=${this.alpha.randomHash(3)}` +
        `&W=${this.alpha.randomNumber({ max: 9 })}`;
  }

  blackBerryPin() {
    return this.alpha.randomHash(8);
  }
}
