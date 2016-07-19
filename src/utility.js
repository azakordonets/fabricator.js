import readFile from 'read-file-relative';
import Alphanumeric from './alpha.js';
import _ from 'lodash';
export default class UtilityService {

  constructor(lang = 'us') {
    this.lang = lang;
    this.resourceFileName = `/resources/${this.lang}.json`;
    this.alpha = new Alphanumeric();
    this.wordsFileName = `/resources/words_${this.lang}.json`;
  }

  getValue(name) {
    const valuesArray = this.getValuesArray(name);
    return valuesArray[this.alpha.randomNumber({ max: valuesArray.length - 1 })];
  }

  getValuesArray(name) {
    const data = readFile.readSync(this.resourceFileName);
    const json = JSON.parse(data);
    return _.at(json, name)[0];
  }

  getWord() {
    const words = readFile.readSync(this.wordsFileName);
    const json = JSON.parse(words);
    const wordsArray = _.at(json, 'words')[0];
    return wordsArray[_.random(0, wordsArray.length - 1)];
  }

}
