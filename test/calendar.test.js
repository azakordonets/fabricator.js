import _ from 'lodash';
import test from 'ava';
import Fabricator from '../src/index';
import UtilityService from '../src/utility';

const fabricator = new Fabricator();
const calendar = fabricator.calendar();
const util = new UtilityService();


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
  for (let i = 0; i <= 25; i++) {
    const hour = calendar.hour24();
    t.true(hour >= 0);
    t.true(hour <= 24);
  }
});

test('Calendar return random hour in 12h format', t => {
  for (let i = 0; i <= 25; i++) {
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
  t.regex(randomDate, /\d{4}-\d{2}-\d{2}/);
});

test(`Calendar returns random ${calendar.date({ format: 'DD-MM-YYYY' })} with custom format`, t => {
  const randomDate = calendar.date({ format: 'DD-MM-YYYY' });
  t.regex(randomDate, /\d{2}-\d{2}-\d{2}/);
});

test('Calendar returns random date in specific day', t => {
  for (let i = 0; i < 10; i++) {
    const date = calendar.customDate()
        .inDay(31)
        .get();
    t.is(date.date(), 31, `${date.format('YYYY-MM-DD')} doesn't seem to have required day`);
  }
});

test('Calendar returns random date in specific month', t => {
  const month = 3;
  for (let i = 0; i <= 10; i++) {
    const date = calendar.customDate()
        .inMonth(month)
        .get();
    t.is(date.month(), month);
  }
});

test('Calendar returns random date in specific year', t => {
  const year = new Date().getFullYear() - 2;
  for (let i = 0; i <= 10; i++) {
    const date = calendar.customDate()
        .inYear(year)
        .get();
    t.is(date.year(), year);
  }
});

test('Calendar returns random date with custom format', t => {
  const date = calendar.customDate()
      .asString('DD-MM-YY')
      .get();
  t.regex(date, /\d{2}-\d{2}-\d{2}/);
});

test('Calendar returns error if day and month are specified', t => {
  t.throws(() => {
    calendar.customDate()
        .inDay(10)
        .inMonth(2)
        .get();
  }, 'We only support now specifying one value at a time. ' +
      'Either day, month or year. No combinations');
});

test('Calendar returns error if day and year are specified', t => {
  t.throws(() => {
    calendar.customDate()
        .inDay(10)
        .inYear(2015)
        .get();
  }, 'We only support now specifying one value at a time. ' +
      'Either day, month or year. No combinations');
});

test('Calendar returns error if month and year are specified', t => {
  t.throws(() => {
    calendar.customDate()
        .inMonth(10)
        .inYear(2015)
        .get();
  }, 'We only support now specifying one value at a time. ' +
      'Either day, month or year. No combinations');
});

test('Calendar returns error if day is set to <= 0', t => {
  t.throws(() => {
    calendar.customDate()
        .inDay(0)
        .get();
  }, 'Day should be in 0-31 range');

  t.throws(() => {
    calendar.customDate()
        .inDay(-2)
        .get();
  }, 'Day should be in 0-31 range');
});

test('Calendar returns error if month is set to <= 1 or >=13', t => {
  t.throws(() => {
    calendar.customDate()
        .inMonth(-1)
        .get();
  }, 'Month should be in 1-12 range');

  t.throws(() => {
    calendar.customDate()
        .inMonth(13)
        .get();
  }, 'Month should be in 1-12 range');
});

test('Calendar returns error if year is <= 1900', t => {
  t.throws(() => {
    calendar.customDate()
        .inYear(1900)
        .get();
  }, 'Year should not be less then 1900');
});
