import test from 'ava';
import Fabricator from '../lib/fabricator.js';

let alpha;

test.beforeEach(t => {
  alpha = new Fabricator().alpha;
});

test('I can get random number', t => {
  t.true(Alphanumeric.number() > 0);
});
