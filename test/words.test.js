import test from 'ava';
import Fabricator from '../src/index.js';

const text = new Fabricator().text();

test(`Should generate random '${text.word()}' word`, t => {
  const word = text.word();
  t.true(word.length > 0);
  t.regex(word, /\w+/);
});

test(`Should return random '${text.sentence()}' sentence`, t => {
  const sentence = text.sentence();
  const sentenceArray = sentence.split(' ');
  t.is(sentenceArray.length, 10);
  sentenceArray.forEach(word => {
    t.true(word.length > 0);
    t.regex(word, /\w+/);
  });
});

test('Should generate random sentence with custom length', t => {
  const sentence = text.sentence({ wordsCount: 15, join: ' ' });
  const sentenceArray = sentence.split(' ');
  t.is(sentenceArray.length, 15);
  sentenceArray.forEach(word => {
    t.true(word.length > 0);
    t.regex(word, /\w+/);
  });
});

test('Should generate random sentence with custom join operator', t => {
  const sentence = text.sentence({ wordsCount: 5, join: '_' });
  const sentenceArray = sentence.split('_');
  t.is(sentenceArray.length, 5);
  sentenceArray.forEach(word => {
    t.true(word.length > 0);
    t.regex(word, /\w+/);
  });
});

test('Should generate random sentence and return it as array', t => {
  const sentence = text.sentence({ asArray: true });
  t.true(sentence instanceof Array);
  t.is(sentence.length, 10);
  sentence.forEach(word => t.true(word.length > 0));
});

test('Should generate random paragraph with default number of words', t => {
  const paragraph = text.paragraph();
  const sentences = paragraph.split('\n');
  t.is(sentences.length, 5);
  sentences.forEach(sentence => {
    t.is(sentence.split(' ').length, 10);
  });
});

