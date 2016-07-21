import test from 'ava';
import Fabricator from '../src/index.js';
import Mobile from '../src/mobile';

const mobile = new Fabricator().mobile();

test('First dummy test for initialization', t => {
  t.true(mobile instanceof Mobile);
});

test(`Generate random ${mobile.androidGsmId()} androiid gsm id`, t => {
  const androidId = mobile.androidGsmId();
  const expectedString =
    '"APA910123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"';
  t.is(androidId.length, 183);
  androidId.split('').map(char => t.true(expectedString.indexOf(char) > -1));
});

test(`Generate random ${mobile.applePushToken()} apple ID`, t => {
  const applePushToken = mobile.applePushToken();
  const expectedString = 'abcdef1234567890';
  t.is(applePushToken.length, 64);
  applePushToken.split('').map(char => t.true(expectedString.indexOf(char) > -1));
});

test(`Generate random ${mobile.wp8Anid2()} windows 8 id`, t => {
  const windows8Id = mobile.wp8Anid2();
  const expectedString = '0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
  const decodedId = new Buffer(windows8Id, 'utf-8').toString();
  decodedId.split('').map(char => t.true(expectedString.indexOf(char) > -1));
});

test(`Generate random ${mobile.wp7Anid()} windows 7 id`, t => {
  const windows7Id = mobile.wp7Anid();
  t.regex(windows7Id, /A=\w(.+?)&E=\w{3}&W=\d/);
});

test(`Generate random ${mobile.blackBerryPin()} blackberry pin`, t => {
  const blackBerryPin = mobile.blackBerryPin();
  t.is(blackBerryPin.length, 8);
});
