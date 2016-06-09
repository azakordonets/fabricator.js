import readFile from 'read-file-relative';
import Alphanumeric from './alpha.js';
import _ from 'lodash';
export default class UtilityService {

  constructor(lang = 'us') {
    this.lang = lang;
    this.resourceFileName = `/resources/${this.lang}.json`;
    this.alpha = new Alphanumeric();
    this.wordsFileName = `/resources/${this.lang}.json`;
  }

  getValue(name) {
    const valuesArray = this.getValuesArray(name);
    return valuesArray[this.alpha.randomNumber(0, valuesArray.length - 1)];
  }

  getValuesArray(name) {
    const data = readFile.readSync(this.resourceFileName);
    const json = JSON.parse(data);
    return _.at(json, name)[0];
  }

}
