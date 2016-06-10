import UtilityService from './utility';
import Alphanumeric from './alpha';

export default class Calendar {

  constructor(lang = 'us') {
    this.lang = lang;
    this.utility = new UtilityService(this.lang);
    this.alpha = new Alphanumeric(this.lang);
  }

  second() {
    const second = this.alpha.randomNumber(0, 59);
    return second <= 9 ? `0${second}` : second;
  }

  minute() {
    return this.second();
  }

  hour24(format24h = true) {
    return format24h ? this.alpha.randomNumber(0, 24) : this.alpha.randomNumber(0, 12);
  }

  ampm() {
    return this.alpha.randomNumber(0, 10) < 5 ? 'am' : 'pm';
  }

  dayOfWeek() {
    return this.utility.getValue('calendar.day_of_week');
  }

  month(params = { asNumber: false, short: false }) {
    if (params.asNumber) {
      return this.alpha.randomNumber(1, 12);
    }
    const month = this.utility.getValue('calendar.month');
    return params.short ? month.substring(0, 3) : month;
  }

  century() {
    return this.utility.getValue('calendar.centuries');
  }
}
