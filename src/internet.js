import uuid1 from 'uuid/v1';
import uuid3 from 'uuid/v3';
import uuid4 from 'uuid/v4';
import uuid5 from 'uuid/v5';
import UrlBuilder from './entities/urlBuilder';
import Alphanumeric from './alpha';
import UtilityService from './utility';
import Contact from './contact';
import Words from './words';

function rgbToHex(rgbValue) {
  const hex = rgbValue.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function toShortHexComponent(rgbValue) {
  return rgbToHex(rgbValue).charAt(0);
}

export default class Internet {
  constructor(lang = 'us') {
    this.lang = lang;
    this.alpha = new Alphanumeric(lang);
    this.util = new UtilityService(lang);
    this.contact = new Contact(lang);
    this.words = new Words(lang);
  }

  url() {
    return new UrlBuilder();
  }

  appleToken() {
    return this.alpha.string({ max: 64 });
  }

  ip() {
    const octets = [...new Array(4)].map(() => this.alpha.randomNumber({ min: 0, max: 255 }));
    const ip = octets.join('.');
    if (ip === '0.0.0.0' || ip === '255.255.255.255') {
      return this.ip();
    }
    return ip;
  }

  ipv6() {
    return [...new Array(8)].map(() =>
      this.alpha.string({ from: 'abcdefABCDEF0123456789', max: 4 })).join(':');
  }

  macAddress() {
    const hexDigits = '0123456789ABCDEF';
    let macAddress = '';
    for (let i = 0; i < 6; i++) {
      macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
      macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
      if (i !== 5) macAddress += ':';
    }
    return macAddress;
  }

  uuid(version = 4) {
    const uuidByVersion = {
      1: () => uuid1(),
      3: () => uuid3(this.alpha.string({ max: 32 }), uuid3.DNS),
      4: () => uuid4(),
      5: () => uuid5(this.alpha.string({ max: 32 }), uuid5.DNS),
    };

    const generator = uuidByVersion[version] || uuid4;
    return generator();
  }

  username() {
    let firstName = this.contact.firstName().replace(/\s'/, '');
    firstName = `${firstName.charAt(0).toLowerCase()}${firstName.slice(1)}`;
    let lastName = this.contact.lastName().replace(/\s'/, '');
    lastName = `${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`;
    const number = this.alpha.randomNumber({ min: 1960, max: new Date().getFullYear() });
    return `${firstName}${lastName}${number}`;
  }

  twitter() {
    let firstName = this.contact.firstName().replace(/\s'/, '');
    firstName = `${firstName.charAt(0).toLowerCase()}${firstName.slice(1)}`;
    let lastName = this.contact.lastName().replace(/\s'/, '');
    lastName = `${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`;
    const number = this.alpha.randomNumber({ max: 99999 });
    return `@${firstName}${lastName}${number}`;
  }

  hashtag() {
    return `#${this.words.words(3).join('')}`;
  }

  googleAnalyticsTrackCode() {
    return `UA-${this.alpha.randomNumber({ min: 10000, max: 100000 })}` +
            `-${this.alpha.randomNumber({ min: 10, max: 100 })}`;
  }

  facebookId() {
    return [...new Array(16)].map(() => this.alpha.randomNumber({ max: 9 })).join('');
  }

  avatar() {
    return `https://s3.amazonaws.com/uifaces/faces/twitter/${this.util.getValue('internet.avatar')}`;
  }

  color() {
    const red = this.alpha.randomNumber({ min: 1, max: 256 });
    const green = this.alpha.randomNumber({ min: 1, max: 256 });
    const blue = this.alpha.randomNumber({ min: 1, max: 256 });
    const hex = `#${rgbToHex(red)}${rgbToHex(green)}${rgbToHex(blue)}`;
    const shortHex = `#${toShortHexComponent(red)}` +
      `${toShortHexComponent(green)}${toShortHexComponent(blue)}`;
    return { red, green, blue, hex, shortHex };
  }


}
