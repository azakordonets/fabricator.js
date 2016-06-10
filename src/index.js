import Alpha from './alpha';
import Calendar from './calendar';

export default class Fabricator {

  constructor(lang = 'us') {
    this.name = 'Fabricator';
    this.lang = lang;
  }

  alpha() {
    return new Alpha(this.lang);
  }

  calendar() {
    return new Calendar(this.lang);
  }
}
