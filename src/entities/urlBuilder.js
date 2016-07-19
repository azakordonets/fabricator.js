import UtilityService from '../utility';
export default class UrlBuilder {

  constructor(lang = 'us') {
    this.lang = lang;
    this.util = new UtilityService(lang);
  }

}
