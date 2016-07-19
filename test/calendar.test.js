import test from 'ava';
import Fabricator from '../src/index';
import UtilityService from '../src/utility';
import _ from 'lodash';
import Calendar from '../src/calendar';

const fabricator = new Fabricator();
const calendar = fabricator.calendar();
const alpha = fabricator.alpha();
const util = new UtilityService();

const dateDiffInMillis = (date1, date2) =>
Math.abs(date2.getTime() - date1.getTime());

const dayDifferenceInSeconds = (date1, date2) =>
Math.round(dateDiffInMillis(date1, date2) / 1000);


const minuteDifferenceBetweenDates = (date1, date2) =>
  Math.round(dayDifferenceInSeconds(date1, date2) / 60);


const hourDifferenceBetweenDates = (date1, date2) =>
  Math.round(minuteDifferenceBetweenDates(date1, date2) / 60);

const dayDifferenceBetweenDays = (date1, date2) =>
  Math.round(hourDifferenceBetweenDates(date1, date2) / 24);

test('Calendar returns random day of the week', t => {
  const dayOfTheWeek = calendar.dayOfWeek();
  const listOfDaysOfTheWeek = util.getValuesArray('calendar.day_of_week');
  t.true(_.includes(listOfDaysOfTheWeek, dayOfTheWeek));
});

test('Return am or pm randomly', t => {
  let amCount = 0;
  let pmCount = 0;
  for (let i = 0; i <= 25; i++) {
    const ampm = calendar.ampm();
    if (ampm === 'am') {
      amCount++;
    } else {
      pmCount++;
    }
  }
  t.true(amCount > 0);
  t.true(pmCount > 0);
});

test('Calendar returns random second', t => {
  const second = calendar.second();
  t.regex(second, /\d{2}/);
});

test('Calendar returns random minute', t => {
  const minute = calendar.minute();
  t.regex(minute, /\d{2}/);
});

test('Calendar return random hour in 24h format', t => {
  for (let i = 0; i <= 25; i ++) {
    const hour = calendar.hour24();
    t.true(hour >= 0);
    t.true(hour <= 24);
  }
});

test('Calendar return random hour in 12h format', t => {
  for (let i = 0; i <= 25; i ++) {
    const hour = calendar.hour24(false);
    t.true(hour >= 0);
    t.true(hour <= 12);
  }
});

test('Calendar returns random time in 12h format', t => {
  for (let i = 0; i <= 25; i++) {
    const time = calendar.time(false);
    t.regex(time, /\d{2}:\d{2}/);
    const hour = parseInt(time.split(':')[0], 10);
    const minute = time.split(':')[1];
    t.true(hour > 0);
    t.true(hour <= 12);
    t.true(minute >= 0);
    t.true(hour <= 59);
  }
});

test('Calendar returns random time in 24h format', t => {
  for (let i = 0; i <= 25; i++) {
    const time = calendar.time();
    t.regex(time, /\d{2}:\d{2}/);
    const hour = parseInt(time.split(':')[0], 10);
    const minute = time.split(':')[1];
    t.true(hour > 0);
    t.true(hour <= 24);
    t.true(minute >= 0);
    t.true(hour <= 59);
  }
});

test('Calendar returns a random day', t => {
  const randomDay = calendar.day();
  t.true(randomDay >= 1);
  t.true(randomDay <= 31);
});

test('Calendar returns a random month as a number', t => {
  for (let i = 0; i < 15; i++) {
    const month = calendar.month({ asNumber: true });
    t.true(month > 0);
    t.true(month <= 12);
  }
});

test('Calendar returns a random month as a string', t => {
  const arrayOfMonths = util.getValuesArray('calendar.month');
  for (let i = 0; i < 15; i++) {
    const month = calendar.month();
    t.true(_.includes(arrayOfMonths, month));
  }
});

test('Calendar returns a random month as a string', t => {
  for (let i = 0; i < 15; i++) {
    const month = calendar.month({ short: true });
    t.true(month.length === 3);
  }
});

test('Calendar returns a random year ', t => {
  const year = calendar.year();
  t.true(year >= 1940);
  t.true(year <= new Date().getFullYear());
});

test('Calendar returns a random year with custom range', t => {
  const min = 1870;
  const max = 1900;
  const year = calendar.year({ min, max });
  t.true(year >= min);
  t.true(year <= max);
});

test('Calendar returns a random century', t => {
  const century = calendar.century();
  const centuryArray = util.getValuesArray('calendar.centuries');
  t.true(_.includes(centuryArray, century));
});

test('Calendar returns random date as Date object', t => {
  for (let i = 0; i < 10; i++) {
    const randomDate1 = calendar.date();
    const randomDate2 = calendar.date();
    t.true(typeof randomDate1 === 'object');
    t.true(typeof randomDate2 === 'object');
    t.not(randomDate1, randomDate2);
  }
});

test('Calendar returns random date as string', t => {
  const randomDate = calendar.date({ asString: true });
  t.true(typeof randomDate === 'string');
});

test(`Calendar returns random ${calendar.date({ format: 'DD-MM-YY' })} with custom format`, t => {
  const randomDate = calendar.date({ format: 'DD-MM-YY' });
  t.regex(randomDate, /\d{2}-\d{2}-\d{2}/);
});


/**
 * Date Range tests
 */

test('Calendar returns default date range', t => {
  const dateRange = Calendar.dateRange().get();
  t.deepEqual(dateRange.length, 11, 'Length of default date range');
  for (let i = 0; i <= dateRange.length - 2; i++) {
    const day1 = dateRange[i];
    const dayAfterDay1 = dateRange[i + 1];
    const differenceBetweenDays = dayDifferenceBetweenDays(day1, dayAfterDay1);
    t.true(differenceBetweenDays >= 28);
    t.true(differenceBetweenDays <= 31);
  }
});

const dateStartValuesTest = (t, value, valueType, rangeLength, rangeLengthDelta) => {
  let generatedDateRange;

  switch (valueType) {
    case 'minute' :
      generatedDateRange = Calendar.dateRange().withStartMinute(value).get();
      break;
    case 'hour' :
      generatedDateRange = Calendar.dateRange().withStartHour(value).get();
      break;
    case 'day':
      generatedDateRange = Calendar.dateRange().withStartDay(value).get();
      break;
    case 'month':
      generatedDateRange = Calendar.dateRange().withStartMonth(value).get();
      break;
    default :
      generatedDateRange = Calendar.dateRange().withStartDay(value).get();
  }


  const amountInRange = generatedDateRange.length >= rangeLength - rangeLengthDelta
    && generatedDateRange.length <= rangeLength + rangeLengthDelta;
  t.true(amountInRange, `Length of default ${valueType} date range`);

  for (let i = 0; i <= generatedDateRange.length - 2; i++) {
    const day1 = generatedDateRange[i];
    const dayAfterDay1 = generatedDateRange[i + 1];
    const differenceBetweenDays = dayDifferenceBetweenDays(day1, dayAfterDay1);

    t.true(differenceBetweenDays >= 28);
    t.true(differenceBetweenDays <= 31);
  }
};

dateStartValuesTest.title = (providedTitle, value, valueType) =>
`${providedTitle} with start ${valueType} = ${value}`;


test('Calendar returns default date range',
  dateStartValuesTest, alpha.randomNumber({ min: 1, max: 59 }), 'minute', 12, 1);

test('Calendar returns default date range',
  dateStartValuesTest, calendar.hour24(), 'hour', 11, 1);

test('Calendar returns default date range',
  dateStartValuesTest, calendar.day() - 1, 'day', 11, 1);

test('Calendar returns default date range',
  dateStartValuesTest, new Date().getMonth(), 'month', 11, 1);


test('Calendar returns default date range with start year' +
      `set to ${new Date().getFullYear()} year`, t => {
  const startYear = new Date().getFullYear();
  const endYear = new Date().getFullYear() + 5;
  const dateRange = Calendar.dateRange()
                                        .withStartYear(startYear)
                                        .withEndYear(endYear)
                                        .stepEvery(1, 'year')
                                        .get();
  t.is(dateRange.length, 4);
  for (let i = 0; i < dateRange.length - 1; i++) {
    const date = dateRange[i];
    const nextDate = dateRange[i + 1];
    const yearDifference = nextDate.getFullYear() - date.getFullYear();
    t.true(yearDifference === 1);
    t.true(date.getFullYear() >= startYear);
    t.true(date.getFullYear() <= endYear);
  }
});


/**
 * End range tests
 */

const dateEndValuesTest = (t, value, valueType, rangeLength, rangeLengthDelta) => {
  let generatedDateRange;

  switch (valueType) {
    case 'minute' :
      generatedDateRange = Calendar.dateRange().withEndMinute(value).get();
      break;
    case 'hour' :
      generatedDateRange = Calendar.dateRange().withEndHour(value).get();
      break;
    case 'day':
      generatedDateRange = Calendar.dateRange().withEndDay(value).get();
      break;
    case 'month':
      generatedDateRange = Calendar.dateRange().withEndMonth(value).get();
      break;
    default :
      generatedDateRange = Calendar.dateRange().withEndDay(value).get();
  }


  const amountInRange = generatedDateRange.length >= rangeLength - rangeLengthDelta
    && generatedDateRange.length <= rangeLength + rangeLengthDelta;
  t.true(amountInRange, `Length of default ${valueType} date range`);


  for (let i = 0; i <= generatedDateRange.length - 2; i++) {
    const day1 = generatedDateRange[i];
    const dayAfterDay1 = generatedDateRange[i + 1];
    const differenceBetweenDays = dayDifferenceBetweenDays(day1, dayAfterDay1);

    t.true(differenceBetweenDays >= 28);
    t.true(differenceBetweenDays <= 31);
  }
};

dateEndValuesTest.title = (providedTitle, value, valueType) =>
  `${providedTitle} with start ${valueType} = ${value}`;


test('Calendar returns default date range',
  dateEndValuesTest, alpha.randomNumber({ min: 1, max: 59 }), 'minute', 12, 1);

test('Calendar returns default date range',
  dateEndValuesTest, calendar.hour24(), 'hour', 11, 1);

test('Calendar returns default date range',
  dateEndValuesTest, calendar.day() - 1, 'day', 11, 1);

test('Calendar returns default date range',
  dateEndValuesTest, new Date().getMonth(), 'month', 11, 1);

test('Calendar returns date range with minute step', t => {
  const dateRange = Calendar.dateRange()
                                        .withStartMinute(0)
                                        .withStartHour(0)
                                        .withStartDay(5)
                                        .withStartMonth(3)
                                        .withStartYear(2016)
                                        .withEndMinute(0)
                                        .withEndHour(0)
                                        .withEndDay(6)
                                        .withEndMonth(3)
                                        .withEndYear(2016)
                                        .stepEvery(1, 'minute')
                                        .get();
  t.is(dateRange.length, 1439);
  for (let i = 0; i < dateRange.length - 1; i++) {
    const date = dateRange[i];
    const nextDate = dateRange[i + 1];
    t.is(minuteDifferenceBetweenDates(nextDate, date), 1);
  }
});

test('Calendar returns date range with hour step', t => {
  const dateRange = Calendar.dateRange()
    .withStartMinute(0)
    .withStartHour(0)
    .withStartDay(5)
    .withStartMonth(3)
    .withStartYear(2016)
    .withEndMinute(0)
    .withEndHour(0)
    .withEndDay(6)
    .withEndMonth(3)
    .withEndYear(2016)
    .stepEvery(1, 'hour')
    .get();
  t.is(dateRange.length, 23);
  for (let i = 0; i < dateRange.length - 1; i++) {
    const date = dateRange[i];
    const nextDate = dateRange[i + 1];
    t.is(hourDifferenceBetweenDates(nextDate, date), 1);
  }
});

test('Calendar returns date range with day step', t => {
  const dateRange = Calendar.dateRange()
    .withStartMinute(0)
    .withStartHour(0)
    .withStartDay(5)
    .withStartMonth(3)
    .withStartYear(2016)
    .withEndMinute(0)
    .withEndHour(0)
    .withEndDay(5)
    .withEndMonth(4)
    .withEndYear(2016)
    .stepEvery(1, 'day')
    .get();
  t.is(dateRange.length, 29);
  for (let i = 0; i < dateRange.length - 1; i++) {
    const date = dateRange[i];
    const nextDate = dateRange[i + 1];
    t.is(dayDifferenceBetweenDays(nextDate, date), 1);
  }
});

test('Calendar returns date range with month step', t => {
  const dateRange = Calendar.dateRange()
    .withStartMinute(0)
    .withStartHour(0)
    .withStartDay(5)
    .withStartMonth(3)
    .withStartYear(2016)
    .withEndMinute(0)
    .withEndHour(0)
    .withEndDay(5)
    .withEndMonth(12)
    .withEndYear(2016)
    .stepEvery(1, 'month')
    .get();
  t.is(dateRange.length, 8);
  for (let i = 0; i < dateRange.length - 1; i++) {
    const date = dateRange[i];
    const nextDate = dateRange[i + 1];
    t.true(dayDifferenceBetweenDays(nextDate, date) >= 30 ||
           dayDifferenceBetweenDays(nextDate, date) <= 31);
  }
});

test('Calendar returns date range as string with default format', t => {
  const dateRange = Calendar.dateRange()
    .withStartDay(5)
    .withStartMonth(3)
    .withStartYear(2016)
    .withEndDay(10)
    .withEndMonth(5)
    .withEndYear(2016)
    .asString()
    .get();
  dateRange.map(date => t.regex(date, /\d{2}-\d{2}-\d{4}/));
});

test('Calendar returns date range as string with custom format', t => {
  const dateRange = Calendar.dateRange()
    .withStartDay(5)
    .withStartMonth(3)
    .withStartYear(2016)
    .withEndDay(10)
    .withEndMonth(5)
    .withEndYear(2016)
    .asString('DD-MM-YY')
    .get();
  dateRange.map(date => t.regex(date, /\d{2}-\d{2}-\d{2}/));
});

