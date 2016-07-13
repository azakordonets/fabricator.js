import UrlBuilder from './entities/urlBuilder';
export default class Internet {
  constructor(lang = 'us') {
    this.lang = lang;
  }

  static url() {
    return new UrlBuilder();
  }
}
