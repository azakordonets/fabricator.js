import moment from 'moment';
import Calendar from '../calendar';

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
    this.month = month + 1;
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
    // if user wanted random date in specific month/day and this date is not valid
    // then we can't help him with that
    if (this.useSpecifiedDay && this.useSpecifiedMonth && this.useSpecifiedYear) {
      throw Error('It doesn\'t makes sence to ask for random date in specific day, month, year');
    }
    if (
        (this.useSpecifiedDay && this.useSpecifiedMonth) ||
        (this.useSpecifiedDay && this.useSpecifiedYear) ||
        (this.useSpecifiedMonth && this.useSpecifiedYear)
    ) {
      throw new Error('We only support now specifying one value at a time. ' +
            'Either day, month or year. No combinations');
    }
    if (this.day <= 0 || this.day >= 32) {
      throw new Error('Day should be in 0-31 range');
    }
    if (this.month <= 0 || this.month >= 13) {
      throw new Error('Month should be in 1-12 range');
    }

    if (this.year <= 1900) {
      throw new Error('Year should not be less then 1900');
    }

    let randomDate = moment(`${this.year}-${this.month}-${this.day}`, 'YYYY-MM-DD');
    while (!randomDate.isValid()) {
      if (this.useSpecifiedDay) {
        this.month = this.cal.month({ asNumber: true });
        this.year = this.cal.year();
      } else if (this.useSpecifiedMonth) {
        this.day = this.cal.day();
        this.year = this.cal.year();
      } else if (this.useSpecifiedYear) {
        this.day = this.cal.day();
        this.month = this.cal.month({ asNumber: true });
      } else {
        this.day = this.cal.day();
        this.month = this.cal.month({ asNumber: true });
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
