import test from 'ava';
import Fabricator from '../src/index.js';
import Internet from '../src/internet';

const internet = new Fabricator().internet();

test('First dummy test for initialization', t => {
  t.true(internet instanceof Internet);
});
