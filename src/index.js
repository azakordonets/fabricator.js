import Alpha from './alpha';
import Calendar from './calendar';
import Contact from './contact';
import Words from './words';
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

  contact() {
    return new Contact(this.lang);
  }

  text() {
    return new Words(this.lang);
  }
}
