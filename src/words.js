import UtilityService from './utility';
export default class Words {

  constructor(lang = 'us') {
    this.lang = lang;
    this.util = new UtilityService(lang);
  }

  word() {
    return this.util.getWord();
  }

  sentence(params = { wordsCount: 10, asArray: false }) {
    const count = params.wordsCount ? params.wordsCount : 10;
    const finalWordsArray = [];
    for (let i = 0; i < count; i++) {
      const word = this.word();
      finalWordsArray.push(word);
    }
    if (params.join) {
      return params.asArray ? finalWordsArray : finalWordsArray.join(params.join);
    }
    return params.asArray ? finalWordsArray : finalWordsArray.join(' ');
  }

  paragraph(wordsCount = 50) {
    const paragraphArray = [];
    for (let i = 0; i < wordsCount / 10; i++) {
      paragraphArray.push(this.sentence({ asArray: true }));
    }
    return paragraphArray.map(sentenceArray => sentenceArray.join(' ')).join('\n');
  }
}
