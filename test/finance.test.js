import test from 'ava';
import Fabricator from '../src/index.js';

const finance = new Fabricator().finance();

test(`Should generate random ${finance.iban()} iban`, t => {
  const iban = finance.iban();
  console.log(iban);
})
