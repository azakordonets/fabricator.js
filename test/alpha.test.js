import test from 'ava';
import Fabricator from '../src/index.js';

const alpha = new Fabricator().alpha();

const isInt = number => Number(number) === number && number % 1 === 0;

test('generates random number from default range (0 to 1000)', t => {
  const number1 = alpha.randomNumber();
  const number2 = alpha.randomNumber();
  t.true(isInt(number1));
  t.true(isInt(number2));
  t.true(number1 !== number2);
  t.true(number1 >= 0 && number1 <= 1000);
  t.true(number2 >= 0 && number2 <= 1000);
});

function isInRange(number, min, max) {
  return number >= min && number <= max;
}

function randomNumberWithCustomRange(t, min, max) {
  for (let i = 0; i < 10; i++) {
    const number1 = alpha.randomNumber(min, max);
    const number2 = alpha.randomNumber(min, max);
    t.true(isInt(number1))
    t.true(isInt(number2))
    t.true(number1 !== number2);
    t.true(isInRange(number1, min, max));
    t.true(isInRange(number2, min, max));
  }
}

randomNumberWithCustomRange.title = (providedTitle, min, max) =>
    `${providedTitle} from ${min} to ${max}`;

test('generated number is in range', randomNumberWithCustomRange, 200, 300);
test('generated number is in range', randomNumberWithCustomRange, -300, 500);
test('generated number is in range', randomNumberWithCustomRange, -300, -100);
test('generated number is in range', randomNumberWithCustomRange, 0, 9007199254740992);
test('generated number is in range', randomNumberWithCustomRange, -9007199254740992, 9007199254740992);
