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

  month({ asNumber = false, short = false } = {}) {
    if (asNumber) {
      const monthNumber = this.alpha.randomNumber({ min: 1, max: 12 });
      return monthNumber <= 9 ? `0${monthNumber}` : monthNumber;
    }
    const month = this.utility.getValue('calendar.month');
    return short ? month.substring(0, 3) : month;
  }

  year({ min = 1940, max = new Date().getFullYear() } = {}) {
    return this.alpha.randomNumber({ min, max });
  }

  date({ asString = false, format = 'YYYY-MM-DD' } = {}) {
    if (asString || format !== 'YYYY-MM-DD') {
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
