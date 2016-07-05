import moment from 'moment';
export default class DateRange {
  constructor() {
    this.now = new Date();
    this.startMinute = this.now.getMinutes();
    this.startHour = this.now.getHours();
    this.startDay = this.now.getDate();
    this.startMonth = this.now.getMonth();
    this.startYear = this.now.getFullYear();
    this.endMinute = this.startMinute;
    this.endHour = this.startHour;
    this.endDay = this.startDay;
    this.endMonth = this.startMonth;
    this.endYear = this.startYear + 1;
    this.stepValue = 1;
    this.stepType = 'month';
    this.returnAsString = false;
    this.stringFormat = 'DD-MM-YYYY';
  }

  withStartMinute(minute) {
    this.startMinute = minute;
    return this;
  }

  withStartHour(hour) {
    this.startHour = hour;
    return this;
  }

  withStartDay(day) {
    this.startDay = day;
    return this;
  }

  withStartMonth(month) {
    this.startMonth = month;
    return this;
  }

  withStartYear(startYear) {
    this.startYear = startYear;
    return this;
  }

  withEndMinute(minute) {
    this.endMinute = minute;
    return this;
  }

  withEndHour(hour) {
    this.endHour = hour;
    return this;
  }

  withEndDay(day) {
    this.endDay = day;
    return this;
  }

  withEndMonth(month) {
    this.endMonth = month;
    return this;
  }

  withEndYear(year) {
    this.endYear = year;
    return this;
  }

  stepEvery(stepValue, stepType) {
    this.stepValue = stepValue;
    this.stepType = stepType;
    return this;
  }

  asString(format) {
    this.returnAsString = true;
    if (format) {
      this.stringFormat = format;
    }
    return this;
  }

  get() {
    if (this.stepValue <= 0) {
      throw new Error('Step value should be more then 0');
    }
    const startDate = new Date(this.startYear, this.startMonth,
      this.startDay, this.startHour, this.startMinute);

    const endDate = new Date(this.endYear, this.endMonth, this.endDay,
      this.endHour, this.endMinute);
    const datesRange = [];
    while (startDate < endDate) {
      switch (this.stepType) {
        case 'minute' : {
          const newMinuteDate = new Date(startDate.setMinutes(startDate.getMinutes() + 1));
          if (newMinuteDate < endDate) {
            datesRange.push(newMinuteDate);
          }
          break;
        }
        case 'hour' : {
          const newHourDate = new Date(startDate.setHours(startDate.getHours() + 1));
          if (newHourDate < endDate) {
            datesRange.push(newHourDate);
          }
          break;
        }
        case 'day' : {
          const newDayDate = new Date(startDate.setDate(startDate.getDate() + 1));
          if (newDayDate < endDate) {
            datesRange.push(newDayDate);
          }
          break;
        }

        case 'month' : {
          const newMonthDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
          if (newMonthDate < endDate) {
            datesRange.push(newMonthDate);
          }
          break;
        }
        case 'year' : {
          const newYearDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
          if (newYearDate < endDate) {
            datesRange.push(newYearDate);
          }
          break;
        }
        default : {
          throw new Error('Please provide correct range type. ' +
            'Available options are : minute, hour, day, month, year');
        }
      }
    }
    if (this.returnAsString) {
      return datesRange.map(date => moment(date).format(this.stringFormat));
    }
    return datesRange;
  }
}
