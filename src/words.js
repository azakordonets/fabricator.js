import UtilityService from './utility';
export default class Words {

  constructor(lang = 'us') {
    this.lang = lang;
    this.util = new UtilityService(lang);
  }

  word() {
    return this.util.getWord();
  }

  words(amount) {
    const words = [];
    for (let count = 0; count < amount; count++) {
      words.push(this.word());
    }
    return words;
  }

  sentence(params = { wordsCount: 10, asArray: false }) {
    const wordsAmount = params.wordsCount ? params.wordsCount : 10;
    const words = this.words(wordsAmount);
    if (params.join) {
      return params.asArray ? words : words.join(params.join);
    }
    return params.asArray ? words : words.join(' ');
  }

  paragraph(wordsCount = 50) {
    const paragraphArray = [];
    for (let i = 0; i < wordsCount / 10; i++) {
      paragraphArray.push(this.sentence({ asArray: true }));
    }
    return paragraphArray.map(sentenceArray => sentenceArray.join(' ')).join('\n');
  }
}
