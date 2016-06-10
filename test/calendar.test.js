import test from 'ava';
import Fabricator from '../src/index';
import UtilityService from '../src/utility';
import _ from 'lodash';

const fabricator = new Fabricator();
const calendar = fabricator.calendar();
// const alpha = fabricator.alpha();
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
})

test('Calendar returns random minute', t => {
  const minute = calendar.minute();
  t.regex(minute, /\d{2}/);
});

test('Calendar return random hour in 24h format', t => {
  for (let i = 0; i <= 25; i ++) {
    const hour = calendar.hour24();
    t.true(hour >= 0 && hour <= 24);
  }
});

test('Calendar return random hour in 12h format', t => {
  for (let i = 0; i <= 25; i ++) {
    const hour = calendar.hour24(false);
    t.true(hour >= 0 && hour <= 12);
  }
});

test('Calendar returns a random month as a number', t => {
  for (let i = 0; i < 15; i++) {
    const month = calendar.month({ asNumber: true });
    t.true(month > 0 && month <= 12);
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

test('Calendar returns a random century', t => {
  const century = calendar.century();
  const centuryArray = util.getValuesArray('calendar.centuries');
  t.true(_.includes(centuryArray, century));
})
