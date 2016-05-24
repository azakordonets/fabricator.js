import Alpha from './alpha';

export default class Fabricator {

  constructor(lang = 'en') {
    this.name = 'Fabricator';
    this.lang = lang;
  }

  alpha() {
    return new Alpha(this.lang);
  }
}
