import test from 'ava';
import Fabricator from '../src/index.js';

const alpha = new Fabricator().alpha();

const isInt = number => Number(number) === number && number % 1 === 0;

const isFloat = number => String(number).includes('.');

/**
 * Int numbers tests
 */

test('generates random number from default range (0 to 1000)', t => {
  const number1 = alpha.randomNumber();
  const number2 = alpha.randomNumber();
  t.true(isInt(number1));
  t.true(isInt(number2));
  t.notDeepEqual(number1, number2);
  t.true(number1 >= 0);
  t.true(number1 <= 1000);
  t.true(number2 >= 0);
  t.true(number2 <= 1000);
});


function randomNumberWithCustomRange(t, min, max) {
  const number1 = alpha.randomNumber({ min, max });
  const number2 = alpha.randomNumber({ min, max });
  t.true(isInt(number1));
  t.true(isInt(number2));
  t.true(number1 !== number2);
  t.true(number1 >= min);
  t.true(number1 <= max);
  t.true(number2 >= min);
  t.true(number2 <= max);
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
  t.true(number1 >= 0);
  t.true(number1 <= 1000);
  t.true(number2 >= 0);
  t.true(number2 <= 1000);
});

/**
 * List generation tests
 */

test('generated list of random numbers', t => {
  const listOfRandomNumbers = alpha.listOfRandomNumbers();
  t.deepEqual(100, listOfRandomNumbers.length);
  listOfRandomNumbers.forEach((number) => {
    t.true(isInt(number));
    t.true(number >= 0);
    t.true(number <= 1000);
  });
});

test('generated list of random numbers with custom range', t => {
  const min = 300;
  const max = 4000;
  const listOfRandomNumbers = alpha.listOfRandomNumbers({ amount: 100, min, max });
  t.deepEqual(100, listOfRandomNumbers.length);
  listOfRandomNumbers.forEach((number) => {
    t.true(isInt(number));
    t.true(number >= min);
    t.true(number <= max);
  });
});

test('generated list of random floats with custom range', t => {
  const min = 300;
  const max = 4000;
  const listOfRandomNumbers = alpha.listOfRandomFloats({ amount: 50, min, max, precision: 2 });
  t.deepEqual(50, listOfRandomNumbers.length);
  listOfRandomNumbers.forEach((number) => {
    t.true(isFloat(number));
    t.true(number >= min);
    t.true(number <= max);
  });
});

test(`Generate random ${alpha.string()} string with default length`, t => {
  const string = alpha.string();
  t.is(string.length, 30);
  t.regex(string, /\w+/g);
});

test(`Generate random ${alpha.string({ max: 10 })} string with length = 10`, t => {
  const string = alpha.string({ max: 10 });
  t.is(string.length, 10);
  t.regex(string, /\w+/g);
});

test(`Generate random ${alpha.string({ max: 10 })} string with length and from section`, t => {
  const from = 'ABCDEFG';
  const string = alpha.string({ max: 10, from });
  t.is(string.length, 10);
  t.regex(string, /\w+/g);
  string.split('').map(char => t.true(from.includes(char)));
});

function numerifyTest(t, pattern, expectedRegex) {
  const numerifyValue = alpha.numerify(pattern);
  t.regex(numerifyValue, expectedRegex, `${numerifyValue} doesn't match ${expectedRegex} regex`);
}

numerifyTest.title = (providedTitle, pattern) =>
  `${providedTitle} for ${pattern} pattern`;

test('Numerify string ', numerifyTest, '##ABC', /\d{2}\w{3}/);
test('Numerify string ', numerifyTest, '##ABC##', /\d{2}\w{3}\d{2}/);
test('Numerify string ', numerifyTest, 'A#B#C#', /\d{1}\w{1}\d{1}\w{1}\d{1}/);
test('Numerify string ', numerifyTest, 'ABC', /\w{3}/);
test('Numerify string ', numerifyTest, '154,#$$%ABC', /\d{3}\W{1}\d{1}\W{3}\w{3}/);

function letterifyTest(t, pattern, expectedRegex) {
  const letterifyValue = alpha.letterify(pattern);
  t.regex(letterifyValue, expectedRegex, `${letterifyValue} doesn't match ${expectedRegex} regex`);
}

letterifyTest.title = (providedTitle, pattern) =>
  `${providedTitle} for ${pattern} pattern`;

test('Letterify string ', letterifyTest, '??123', /\w{2}\d{3}/);
test('Letterify string ', letterifyTest, '??123??', /\w{2}\d{3}\w{2}/);
test('Letterify string ', letterifyTest, '1?2?3?', /\w{1}\d{1}\w{1}\d{1}\w{1}/);
test('Letterify string ', letterifyTest, '123', /\d{3}/);
test('Letterify string ', letterifyTest, '154,?$$%123', /\d{3}\W{1}\w{1}\W{3}\d{3}/);

function botifyTest(t, pattern, expectedRegex) {
  const botifyValue = alpha.botify(pattern);
  t.regex(botifyValue, expectedRegex, `${botifyValue} doesn't match ${expectedRegex} regex`);
}

botifyTest.title = (providedTitle, pattern) =>
  `${providedTitle} for ${pattern} pattern`;

test('Botify string ', botifyTest, '??###', /\w{2}\d{3}/);
test('Botify string ', botifyTest, '??###??', /\w{2}\d{3}\w{2}/);
test('Botify string ', botifyTest, '#?#?#?', /\w{1}\d{1}\w{1}\d{1}\w{1}/);
test('Botify string ', botifyTest, '###', /\w{3}/);
test('Botify string ', botifyTest, '###,?$$%###', /\d{3}\W{1}\w{1}\W{3}\d{3}/);

test(`Generate random ${alpha.randomHash()} hash`, t => {
  const hash = alpha.randomHash();
  t.is(hash.length, 40);
  const from = '0123456789abcdef';
  hash.split('').map(char => t.true(from.includes(char)));
});

test(`Generate random ${alpha.randomHash()} hash with custom length`, t => {
  const hash = alpha.randomHash(10);
  t.is(hash.length, 10);
  const from = '0123456789abcdef';
  hash.split('').map(char => t.true(from.includes(char)));
});

test(`Generate random ${alpha.randomGuid()} guid`, t => {
  for (let count = 0; count < 10; count++) {
    const guid = alpha.randomGuid();
    t.regex(guid, /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g);
  }
});
