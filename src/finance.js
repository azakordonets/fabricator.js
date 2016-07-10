import Iban from './entities/iban';
export default class Finance {
  constructor(lang = 'us') {
    this.lang = lang;
    this.ibanBuilder = new Iban();
  }

  iban(countryCode = 'NL') {
    return this.ibanBuilder.generate(countryCode, 'ABNA', '0000000000');
  }

}
