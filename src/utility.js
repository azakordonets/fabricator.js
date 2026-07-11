import _ from 'lodash';
import Alphanumeric from './alpha.js';
import deResources from './resources/de.json';
import nlResources from './resources/nl.json';
import usResources from './resources/us.json';
import deWords from './resources/words_de.json';
import nlWords from './resources/words_nl.json';
import usWords from './resources/words_us.json';

const resourcesByLang = {
  de: deResources,
  nl: nlResources,
  us: usResources,
};

const wordsByLang = {
  de: deWords,
  nl: nlWords,
  us: usWords,
};

export default class UtilityService {

  constructor(lang = 'us') {
    this.lang = lang;
    this.alpha = new Alphanumeric();
    this.resourceData = resourcesByLang[this.lang] || resourcesByLang.us;
    this.wordData = wordsByLang[this.lang] || wordsByLang.us;
  }

  getValue(name) {
    const valuesArray = this.getValuesArray(name);
    return valuesArray[this.alpha.randomNumber({ max: valuesArray.length - 1 })];
  }

  getValuesArray(name) {
    return _.at(this.resourceData, name)[0];
  }

  getWord() {
    const wordsArray = _.at(this.wordData, 'words')[0];
    return wordsArray[_.random(0, wordsArray.length - 1)];
  }

}
