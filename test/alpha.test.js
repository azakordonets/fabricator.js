import test from 'ava';
import Fabricator from '../src/index.js';

const alpha = new Fabricator().alpha();

const isInt = number => Number(number) === number && number % 1 === 0;

const isFloat = number => !!(number % 1);

function isInRange(number, min, max) {
  return number >= min && number <= max;
}

/**
 * Int numbers tests
 */

test('generates random number from default range (0 to 1000)', t => {
  const number1 = alpha.randomNumber();
  const number2 = alpha.randomNumber();
  t.true(isInt(number1));
  t.true(isInt(number2));
  t.notDeepEqual(number1, number2);
  t.true(number1 >= 0 && number1 <= 1000);
  t.true(number2 >= 0 && number2 <= 1000);
});


function randomNumberWithCustomRange(t, min, max) {
  const number1 = alpha.randomNumber(min, max);
  const number2 = alpha.randomNumber(min, max);
  t.true(isInt(number1));
  t.true(isInt(number2));
  t.true(number1 !== number2);
  t.true(isInRange(number1, min, max));
  t.true(isInRange(number2, min, max));
}

randomNumberWithCustomRange.title = (providedTitle, min, max) =>
    `${providedTitle} from ${min} to ${max}`;

test('generated number is in range', randomNumberWithCustomRange, 200, 300);
test('generated number is in range', randomNumberWithCustomRange, -300, 500);
test('generated number is in range', randomNumberWithCustomRange, -300, -100);
test('generated number is in range', randomNumberWithCustomRange, 0, 9007199254740992);
test('generated number is in range',
    randomNumberWithCustomRange, -9007199254740992, 9007199254740992);


/**
 * Float number test
 */

test('generates random number with floating point in default range (0 to 1000)' +
' with default precision = 5', t => {
  const number1 = alpha.randomFloat();
  const number2 = alpha.randomFloat();
  t.true(isFloat(number1));
  t.true(isFloat(number2));
  t.notDeepEqual(number1, number2);
  t.true(number1 >= 0 && number1 <= 1000);
  t.true(number2 >= 0 && number2 <= 1000);
});

/**
 * List generation tests
 */

test('generated list of random numbers', t => {
  const listOfRandomNumbers = alpha.listOfRandomNumbers();
  t.deepEqual(100, listOfRandomNumbers.length);
  listOfRandomNumbers.forEach((number) => {
    t.true(isInt(number));
    t.true(number >= 0 && number <= 1000);
  });
});

test('generated list of random numbers with custom range', t => {
  const min = 300;
  const max = 4000;
  const listOfRandomNumbers = alpha.listOfRandomNumbers(100, min, max);
  t.deepEqual(100, listOfRandomNumbers.length);
  listOfRandomNumbers.forEach((number) => {
    t.true(isInt(number));
    t.true(number >= min && number <= max);
  });
});

