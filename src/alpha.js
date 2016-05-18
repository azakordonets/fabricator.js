export default class Alphanumeric {
    constructor(lang="en") {
        this._lang = lang
    }

    get number() {
        return Math.random()
    }
}