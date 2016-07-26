import UtilityService from './utility';
import Alphanumeric from './alpha';
import RandomDate from './entities/randomDate';

export default class Calendar {

  constructor(lang = 'us') {
    this.lang = lang;
    this.utility = new UtilityService(this.lang);
    this.alpha = new Alphanumeric(this.lang);
  }

  second() {
    const second = this.alpha.randomNumber({ max: 59 });
    return second <= 9 ? `0${second}` : second;
  }

  minute() {
    return this.second();
  }

  hour24(format24h = true) {
    return format24h ? this.alpha.randomNumber({ min: 1, max: 24 }) :
                       this.alpha.randomNumber({ min: 1, max: 12 });
  }

  time(format24h = true) {
    const hour = this.hour24(format24h);
    if (hour <= 9) {
      return `0${hour}:${this.minute()}`;
    }
    return `${hour}:${this.minute()}`;
  }

  ampm() {
    return this.alpha.randomNumber({ max: 10 }) < 5 ? 'am' : 'pm';
  }

  day() {
    const randomDay = this.alpha.randomNumber({ min: 1, max: 31 });
    return randomDay <= 9 ? `0${randomDay}` : randomDay;
  }

  dayOfWeek() {
    return this.utility.getValue('calendar.day_of_week');
  }

  month(params = { asNumber: false, short: false }) {
    if (params.asNumber) {
      const monthNumber = this.alpha.randomNumber({ min: 1, max: 12 });
      return monthNumber <= 9 ? `0${monthNumber}` : monthNumber;
    }
    const month = this.utility.getValue('calendar.month');
    return params.short ? month.substring(0, 3) : month;
  }

  year(params = { min: 1940, max: new Date().getFullYear() }) {
    const min = params.min ? params.min : 1940;
    const max = params.max ? params.max : new Date().getFullYear();
    return this.alpha.randomNumber({ min, max });
  }

  date(options = { asString: false }) {
    const format = options.format ? options.format : 'YYYY-MM-DD';
    let asString = options.asString;
    if (options.format) {
      asString = true;
    }
    if (asString) {
      return this.customDate()
                              .asString(format)
                              .get();
    }
    return this.customDate().get();
  }

  customDate() {
    return new RandomDate();
  }

  century() {
    return this.utility.getValue('calendar.centuries');
  }

}
