import Alphanumeric from '/src/alpha.js';

export default class Fabricator {

    constructor(lang = 'en') {
        this._name = 'Fabricator';
        this._lang = lang
    }

    static alpha() {
        return new Alphanumeric(this._lang)
    }
}