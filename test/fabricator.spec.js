import chai from 'chai';
import Fabricator from '../lib/fabricator.js';

chai.expect();

const expect = chai.expect;

let lib;

suite('Given an instance of my library', function () {
  setup(function () {
    lib = new Fabricator();
  });
  test('when I need the name', function () {
      expect(lib.name).to.be.equal('Fabricator');
  });
});