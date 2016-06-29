import UtilityService from './utility';
import Alphanumeric from './alpha';
import Calendar from './calendar';
import moment from 'moment';
export default class Contact {
  constructor(lang = 'us') {
    this.lang = lang;
    this.utility = new UtilityService(this.lang);
    this.alpha = new Alphanumeric(this.lang);
    this.calendar = new Calendar(this.lang);
  }

  namePrefix() {
    return this.utility.getValue('name.prefix');
  }

  nameSuffix() {
    return this.utility.getValue('name.suffix');
  }

  firstName() {
    return this.utility.getValue('name.first_name');
  }

  lastName() {
    return this.utility.getValue('name.last_name');
  }

  fullName(options = { usePrefix: false, useSuffix: false }) {
    let prefixValue = '';
    if (options.usePrefix) {
      prefixValue = this.namePrefix();
    }
    let suffixValue = '';
    if (options.useSuffix) {
      suffixValue = this.nameSuffix();
    }

    const firstNameValue = this.firstName();
    const lastNameValue = this.lastName();

    return `${prefixValue} ${firstNameValue} ${lastNameValue} ${suffixValue}`.trim();
  }

  birthDate(options = { age: this.alpha.randomNumber(18, 60),
                        format: 'DD-MM-YYYY', asString: false }) {
    const now = new Date();
    // Initialize this consts in case options passed but not with all parameters included
    const age = options.age ? options.age : this.alpha.randomNumber(18, 60);
    const format = options.format ? options.format : 'DD-MM-YYYY';
    const asString = options.asString ? options.asString : false;
    const randomDate = this.calendar.date();
    if (asString) {
      const birthDate = new Date(randomDate.setYear(now.getFullYear() - age));
      return moment(birthDate).format(format);
    }
    return new Date(randomDate.setYear(now.getYear() - age));
  }

  email(specificDomain = '') {
    const domain = specificDomain === '' ?
                  this.utility.getValue('internet.free_email') :
                  specificDomain;
    return `${this.firstName().toLowerCase()}_` +
            `${this.lastName().toLowerCase()}` +
            `${this.alpha.randomNumber(1000, 9999)}@${domain}`;
  }

  phoneNumber(format = '') {
    const phoneFormat = format === '' ?
                        this.utility.getValue('phone_number.phone_formats') :
                        format;
    return this.alpha.numerify(phoneFormat);
  }

  streetName() {
    return this.utility.getValue('address.street_suffix');
  }

  houseNumber() {
    return this.alpha.numerify(this.utility.getValue('address.house_number'));
  }

  apartmentNumber() {
    return this.alpha.numerify(this.utility.getValue('address.app_number'));
  }

  address() {
    return `${this.streetName()} ${this.houseNumber()} ${this.apartmentNumber()}`;
  }

  postcode(format = '') {
    if (format === '') {
      return this.alpha.numerify(this.utility.getValue('address.postcode'));
    }
    return this.alpha.numerify(format);
  }

  country() {
    return this.utility.getValue('address.country');
  }

  city() {
    return `${this.utility.getValue('address.city_prefix')} ${this.utility.getValue('address.city_suffix')}`;
  }

  state() {
    return this.utility.getValue('address.state');
  }

  stateShortCode() {
    return this.utility.getValue('address.state_abbr');
  }

  company() {
    return this.utility.getValue('company.company_suffix');
  }

  bsn() {
    const firstFour = String(this.alpha.randomNumber(1000, 9999));
    const lastFour = firstFour.split('').reverse().join('');
    return `${firstFour}${lastFour}0`;
  }

  religion() {
    return this.utility.getValue('personal_data.religion');
  }

  zodiac() {
    return this.utility.getValue('personal_data.zodiac');
  }

  height(cm = false) {
    if (cm) {
      return `${this.alpha.randomNumber(150, 220)} cm`;
    }
    return `${this.alpha.randomFloat(1.55, 2.250, 3)} m`;
  }

  weight(metric = true) {
    if (metric) {
      return `${this.alpha.randomNumber(50, 110)} kg`;
    }
    return `${this.alpha.randomNumber(30, 90)} lbs`;
  }

  bloodType() {
    return this.utility.getValue('personal_data.blood_type');
  }

  occupation() {
    return this.utility.getValue('personal_data.occupation');
  }

}
