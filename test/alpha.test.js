import test from 'ava';
import Fabricator from '../src/index.js';

let alpha;

// test.beforeEach(() => {
//   alpha = new Fabricator().alpha;
// });

test('I can get random number', t => {
  alpha = new Fabricator().alpha();
  t.true(alpha.number() > 0);
});
