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

  sentence({ wordsCount = 10, asArray = false, join = ' ' } = {}) {
    const words = this.words(wordsCount);
    if (join) {
      return asArray ? words : words.join(join);
    }
    return asArray ? words : words.join(' ');
  }

  paragraph(wordsCount = 50) {
    const paragraphArray = [];
    for (let i = 0; i < wordsCount / 10; i++) {
      paragraphArray.push(this.sentence({ asArray: true }));
    }
    return paragraphArray.map(sentenceArray => sentenceArray.join(' ')).join('\n');
  }
}
