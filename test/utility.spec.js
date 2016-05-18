import chai from 'chai'
import alpha from '../lib/fabricator.js'
import {test} from "../node_modules/mocha/mocha";

chai.expect();
const expect = chai.expect;

suite('Given default instance of alpha library', () => {
    test('Expect default language to be english', () => {
        const alphanumeric = alpha();
        let language = alphanumeric.getLang();
        expect(language).to.be.equal('en')
    })
});