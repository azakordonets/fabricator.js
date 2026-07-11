import test from 'ava';
import Fabricator from '../src/index.js';
import Location from '../src/location';

test('Fabricator exposes location generator', t => {
  const fabricator = new Fabricator();
  t.is(fabricator.location(), Location);
});

