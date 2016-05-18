import chai from 'chai';
import Fabricator from '../lib/fabricator.js';
import {test} from "../node_modules/mocha/mocha";
import {setup} from "../node_modules/mocha/mocha";

chai.expect()

const expect = chai.expect
let alpha;
suite('Given an instance of Alphanumeric class', () => {
    setup(() => {
        let alpha = new Fabricator().alpha
    });
    test('I can get random number', () => {
        expect(alpha.number()).to.be.a('number')
    })
})