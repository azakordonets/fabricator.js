import Calendar from '../calendar';
import moment from 'moment';

export default class RandomDate {
  constructor() {
    this.cal = new Calendar();
    this.day = this.cal.day();
    this.useSpecifiedDay = false;
    this.month = this.cal.month({ asNumber: true });
    this.useSpecifiedMonth = false;
    this.year = this.cal.year();
    this.useSpecifiedYear = false;
    this.returnAsString = false;
  }

  inDay(day) {
    this.day = day;
    this.useSpecifiedDay = true;
    return this;
  }

  inMonth(month) {
    this.month = month;
    this.useSpecifiedMonth = true;
    return this;
  }

  inYear(year) {
    this.year = year;
    this.useSpecifiedYear = true;
    return this;
  }

  asString(format = 'YYYY-MM-DD') {
    this.returnAsString = true;
    this.format = format;
    return this;
  }

  get() {
    let randomDate = moment(`${this.year}-${this.month + 1}-${this.day}`, this.format);
    // if user wanted random date in specific month/day and this date is not valid
    // then we can't help him with that
    if (this.useSpecifiedDay && this.useSpecifiedMonth && this.useSpecifiedYear) {
      throw Error('It doesn\'t makes sence to ask for random date in specific day, month, year');
    }
    if (this.useSpecifiedDay && this.useSpecifiedMonth) {
      if (!randomDate.isValid()) {
        throw Error('This combinatio of day and month are not valid');
      }
    }
    if (this.useSpecifiedYear) {
      if (this.year < 1900) {
        throw Error('Year cannot be less then 1900');
      }
    }
    while (!randomDate.isValid()) {
      if (this.useSpecifiedDay) {
        this.month = this.cal.month();
      }
      if (this.useSpecifiedMonth) {
        this.day = this.cal.day();
        this.year = this.cal.year();
      }
      randomDate = moment(`${this.year}-${this.month}-${this.day}`, 'YYYY-MM-DD');
    }
    if (this.returnAsString) {
      return randomDate.format(this.format);
    }
    return randomDate;
  }
}
