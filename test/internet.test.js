import test from 'ava';
import Fabricator from '../src/index.js';
import Internet from '../src/internet';

const internet = new Fabricator().internet();

test('First dummy test for initialization', t => {
  t.true(internet instanceof Internet);
});

test(`Generate random ${internet.url().asString()} url as String`, t => {
  const url = internet.url().asString();
  t.regex(url, /http:\/\/\w+.\w+\/getEntity\?q=test/g);
});

test('Generate random url as an url object', t => {
  const url = internet.url().asUrl();
  t.is(url.protocol, 'http:');
  t.is(url.slashes, true);
  t.is(url.auth, null);
  t.regex(url.host, /\w+.\w{1,3}/);
  t.is(url.port, null);
  t.regex(url.hostname, /\w+.\w{1,3}/);
  t.is(url.hash, null);
  t.is(url.search, '?q=test');
  t.is(url.query, 'q=test');
  t.is(url.pathname, '/getEntity');
  t.is(url.path, '/getEntity?q=test');
  t.regex(url.href, /http:\/\/\w+.\w+\/getEntity\?q=test/g);
});

test('Generate random url with custom parameters', t => {
  const scheme = 'https';
  const host = 'fabricatortest.com';
  const params = { id: 1, name: 'andrew', location: 12.5 };
  const path = 'getUserById';
  const url = internet.url()
    .withScheme(scheme)
    .withHost(host)
    .withParams(params)
    .withPath(path)
    .asString();
  t.is(url, 'https://fabricatortest.com/getUserById?id=1&name=andrew&location=12.5');
});

test('Generate random url with custom parameters with encoding', t => {
  const scheme = 'https';
  const host = 'fabricatortest.com';
  const params = { id: 1, name: 'andrew', location: 12.5 };
  const path = 'getUserById';
  const url = internet.url()
    .withScheme(scheme)
    .withHost(host)
    .withParams(params)
    .withPath(path)
    .withEncoding()
    .asString();
  t.is(url, 'https://fabricatortest.com/getUserById%3Fid%3D1%26name%3Dandrew%26location%3D12.5');
});

test(`Generate random ${internet.appleToken()} apple token`, t => {
  const appleToken = internet.appleToken();
  t.is(appleToken.length, 64);
  t.regex(appleToken, /\w{64}/);
});

test(`Generate random ${internet.ip()} ip address`, t => {
  const ip = internet.ip();
  t.regex(ip, /\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/);
});

test(`Generate random ${internet.ipv6()} ipv6`, t => {
  const ip = internet.ipv6();
  t.regex(ip, /\w{4}:\w{4}:\w{4}:\w{4}:\w{4}:\w{4}:\w{4}:\w{4}/);
});

test(`Generate random ${internet.macAddress()} macaddress`, t => {
  const macaddress = internet.macAddress();
  t.regex(macaddress, /\w{2}:\w{2}:\w{2}:\w{2}:\w{2}:\w{2}/);
});

test(`Generate random ${internet.uuid()} UUID`, t => {
  for (let version = 0; version <= 4; version++) {
    let uuid;
    if (version === 0) {
      uuid = internet.uuid();
    } else {
      uuid = internet.uuid(version);
    }
    t.true(uuid.length > 0);
  }
});

test(`Generate random ${internet.username()} username`, t => {
  const username = internet.username();
  t.regex(username, /^[a-z-A-Z0-9_]{3,30}$/);
});

test(`Generate random ${internet.twitter()} twitter login`, t => {
  const twitter = internet.twitter();
  t.regex(twitter, /@[a-zA-Z-0-9]+/);
});

test(`Generate random ${internet.hashtag()} hashtag`, t => {
  const hashtag = internet.hashtag();
  t.regex(hashtag, /#([A-Za-z0-9_]+)/);
});

test(`Generate random ${internet.googleAnalyticsTrackCode()} google track code`, t => {
  const googleTrackCode = internet.googleAnalyticsTrackCode();
  t.regex(googleTrackCode, /UA-\d{4,5}-\d{2}/);
});

test(`Generate random ${internet.facebookId()} facebook id`, t => {
  const facebookId = internet.facebookId();
  t.is(facebookId.length, 16);
});

test(`Generate random ${internet.avatar()} avatar url`, t => {
  const avatarUrl = internet.avatar();
  t.regex(avatarUrl, /http.*\/[^\/]+\/128.jpg$/);
});

test(`Generate random ${internet.color()} color object`, t => {
  const color = internet.color();
  t.true(color.red >= 1);
  t.true(color.red <= 256);
  t.true(color.green >= 1);
  t.true(color.green <= 256);
  t.true(color.blue >= 1);
  t.true(color.blue <= 256);
  t.regex(color.hex, /^#[A-Fa-f0-9]{1,6}/);
  t.regex(color.shortHex, /^#[A-Fa-f0-9]{1,6}/);
});

