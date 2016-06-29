import test from 'ava';
import UtilityService from '../src/utility';
import Fabricator from '../src/index.js';


const contact = new Fabricator().contact();
const utility = new UtilityService();

function contains(array, value) {
  return array.lastIndexOf(value) >= 0;
}

test('Generates name prefix', t => {
  const prefix = contact.namePrefix();
  const prefixArray = utility.getValuesArray('name.prefix');
  t.true(contains(prefixArray, prefix, 'Generated value is present ' +
    'in correspondent resource array'));
});

test('Generates name suffix', t => {
  const suffix = contact.nameSuffix();
  const suffixArray = utility.getValuesArray('name.suffix');
  t.true(contains(suffixArray, suffix, 'Generated value is present ' +
    'in correspondent resource array'));
});

test('Generates first name', t => {
  const firstNameValue = contact.firstName();
  const firstNameArray = utility.getValuesArray('name.first_name');
  t.true(contains(firstNameArray, firstNameValue, 'Generated value is present ' +
    'in correspondent resource array'));
});

test('Generates last name', t => {
  const lastNameValue = contact.lastName();
  const lastNameixArray = utility.getValuesArray('name.last_name');
  t.true(contains(lastNameixArray, lastNameValue, 'Generated value is present ' +
    'in correspondent resource array'));
});

test('Generates full name without prefix and suffix', t => {
  const fullNameValue = contact.fullName();
  const firstNameValue = fullNameValue.split(' ')[0];
  const lastNameValue = fullNameValue.split(' ')[1];
  const fistNameArray = utility.getValuesArray('name.first_name');
  const lastNameArray = utility.getValuesArray('name.last_name');
  t.true(contains(fistNameArray, firstNameValue, 'Generated value is present ' +
    'in correspondent resource array'));
  t.true(contains(lastNameArray, lastNameValue, 'Generated value is present ' +
    'in correspondent resource array'));
});

test('Generates full name with prefix and without suffix', t => {
  const fullNameValue = contact.fullName({ usePrefix: true });
  const prefixValue = fullNameValue.split(' ')[0];
  const firstNameValue = fullNameValue.split(' ')[1];
  const lastNameValue = fullNameValue.split(' ')[2];

  const fistNameArray = utility.getValuesArray('name.first_name');
  const lastNameArray = utility.getValuesArray('name.last_name');
  const prefixArray = utility.getValuesArray('name.prefix');

  t.true(contains(fistNameArray, firstNameValue, 'Generated value is present ' +
    'in correspondent resource array'));
  t.true(contains(lastNameArray, lastNameValue, 'Generated value is present ' +
    'in correspondent resource array'));
  t.true(contains(prefixArray, prefixValue, 'Generated value is present ' +
    'in correspondent resource array'));
});

test('Generates full name with prefix and with suffix', t => {
  const fullNameValue = contact.fullName({ usePrefix: true, useSuffix: true });
  const prefixValue = fullNameValue.split(' ')[0];
  const firstNameValue = fullNameValue.split(' ')[1];
  const lastNameValue = fullNameValue.split(' ')[2];
  const suffixValue = fullNameValue.split(' ')[3];

  const fistNameArray = utility.getValuesArray('name.first_name');
  const lastNameArray = utility.getValuesArray('name.last_name');
  const prefixArray = utility.getValuesArray('name.prefix');
  const suffixArray = utility.getValuesArray('name.suffix');

  t.true(contains(fistNameArray, firstNameValue, 'Generated value is present ' +
    'in correspondent resource array'));
  t.true(contains(lastNameArray, lastNameValue, 'Generated value is present ' +
    'in correspondent resource array'));
  t.true(contains(prefixArray, prefixValue, 'Generated value is present ' +
    'in correspondent resource array'));
  t.true(contains(suffixArray, suffixValue, 'Generated value is present ' +
    'in correspondent resource array'));
});

test('Generates birthdate with default parameters', t => {
  const birthDate = contact.birthDate();
  t.true(typeof birthDate === 'object', 'Birthdate returned as a Date object');

  const now = new Date();
  const minBirthDateYear = now.getFullYear() - 60;
  const maxBirthDateYear = now.getFullYear() - 16;
  const yearOfBirth = birthDate.getFullYear();
  t.true(yearOfBirth >= minBirthDateYear && yearOfBirth <= maxBirthDateYear);
});

test('Generates birthdate with specific year of birth', t => {
  const specificAge = 30;
  const birthDate = contact.birthDate({ age: specificAge });
  t.true(typeof birthDate === 'object', 'Birthdate returned as a Date object');

  const now = new Date();
  const expectedYearOfBirth = now.getFullYear() - specificAge;
  t.true(birthDate.getFullYear() === (expectedYearOfBirth));
});

test('Generates birthdate with specific year of birth as a string', t => {
  const specificAge = 30;
  const birthday = contact.birthDate({ age: specificAge, asString: true });
  t.true(typeof birthday === 'string', 'Birthdate returned as a String');
  const now = new Date();
  const expectedYearOfBirth = now.getFullYear() - specificAge;
  t.regex(birthday, /\d{2}-\d{2}-\d{4}/, `Birthdate date is ${birthday}`);
  t.is(birthday.split('-')[2], String(expectedYearOfBirth));
});

test('Generates birthDate with custom format', t => {
  const birthday = contact.birthDate({ format: 'DD-MM-YY', asString: true });
  t.regex(birthday, /\d{2}-\d{2}-\d{2}/, `Birthdate date is ${birthday}`);
});

test(`Generates random ${contact.email()} email`, t => {
  for (let i = 0; i < 10; i++) {
    const email = contact.email();
    t.regex(email, /\w{1,40}_\w{1,40}@gmail.com|yahoo.com|hotmail.com/);
  }
});

test(`Generate random ${contact.email('google.com')} email with google.com domain`, t => {
  for (let i = 0; i < 10; i ++) {
    const specificDomain = 'google.com';
    const email = contact.email(specificDomain);
    t.regex(email, /\w{1,40}_\w{1,40}@(.*)/);
    t.is(email.split('@')[1], specificDomain);
  }
});

test(`Generate random ${contact.phoneNumber()} phone number`, t => {
  for (let i = 0; i <= 10; i++) {
    const phoneNumber = contact.phoneNumber();
    const phoneFormatsArray = utility.getValuesArray('phone_number.phone_formats');
    let reversedPhoneNumber = '';
    if (phoneNumber.substring(0, 2) === '1-') {
      reversedPhoneNumber = '1-' +
      `${phoneNumber.substring(2, phoneNumber.length).replace(/[0-9]/g, '#')}`;
    } else {
      reversedPhoneNumber = phoneNumber.replace(/[0-9]/g, '#');
    }
    t.true(contains(phoneFormatsArray, reversedPhoneNumber));
  }
});

test(`Generate random ${contact.phoneNumber('##-##-##-##-##')} phone number with custom format`,
  t => {
    for (let i = 0; i < 10; i++) {
      const phoneNumber = contact.phoneNumber('##-##-##-##-##');
      t.regex(phoneNumber, /\d{2}-\d{2}-\d{2}-\d{2}-\d{2}/);
    }
  });

test(`Generate random ${contact.postcode()} postcode`, t => {
  const postCode = contact.postcode();
  const postCodeArray = utility.getValuesArray('address.postcode');
  const reversedPostcode = postCode.replace(/[0-9]/g, '#');
  t.true(contains(postCodeArray, reversedPostcode));
});

test(`Generate random ${contact.postcode('####AB')} postcode with custom format`, t => {
  // TODO fix this when botify is implemented
  const postCode = contact.postcode('####AB');
  t.regex(postCode, /\d{4}AB/);
});

test(`Generate random ${contact.country()} country`, t => {
  const country = contact.country();
  const countryArray = utility.getValuesArray('address.country');
  t.true(contains(countryArray, country));
});

test(`Generate random ${contact.state()} state`, t => {
  const state = contact.state();
  const stateArray = utility.getValuesArray('address.state');
  t.true(contains(stateArray, state));
});

test(`Generate random ${contact.stateShortCode()} short state code`, t => {
  const shortCode = contact.stateShortCode();
  const shortCodeArray = utility.getValuesArray('address.state_abbr');
  t.true(contains(shortCodeArray, shortCode));
});

test(`Generate random ${contact.company()} company`, t => {
  const company = contact.company();
  const companyArray = utility.getValuesArray('company.company_suffix');
  t.true(contains(companyArray, company));
});

test(`Generate random ${contact.bsn()} bsn`, t => {
  let bsn = contact.bsn();
  t.true(bsn <= 999999999 && bsn >= 9999999);
  let sum = -1 * bsn % 10;
  for (let multiplier = 2; multiplier <= 100; multiplier++) {
    if (bsn > 0) {
      bsn = Math.floor(bsn / 10);
      const value = bsn % 10;
      sum = sum + (multiplier * value);
    }
  }
  t.true(sum !== 0 && sum % 11 === 0);
});

test(`Generate random ${contact.religion()} religion`, t => {
  const religion = contact.religion();
  const religionArray = utility.getValuesArray('personal_data.religion');
  t.true(contains(religionArray, religion));
});

test(`Generate random ${contact.zodiac()} zodiac`, t => {
  const zodiac = contact.zodiac();
  const zodiacArray = utility.getValuesArray('personal_data.zodiac');
  t.true(contains(zodiacArray, zodiac));
});

test(`Generate random ${contact.height()} height in m`, t => {
  const height = contact.height();
  t.regex(height, /\d{1}\W\d{2}\sm/);
  const heightNumber = parseFloat(height);
  t.true(heightNumber >= 1.55 && heightNumber <= 2.250);
});

test(`Generate random ${contact.height(true)} height in cm`, t => {
  const height = contact.height(true);
  t.regex(height, /\d{3}\scm/);
  const heightNumber = parseInt(height, 10);
  t.true(heightNumber >= 150 && heightNumber <= 220);
});

test(`Generate random ${contact.weight()} weight in kg`, t => {
  const weight = contact.weight();
  t.regex(weight, /\d{2,3}\skg/);
  const weigthNumber = parseInt(weight, 10);
  t.true(weigthNumber >= 50 && weigthNumber <= 110);
});

test(`Generate random ${contact.weight(false)} weight in lbs`, t => {
  const weight = contact.weight(false);
  t.regex(weight, /\d{2}\slbs/);
  const weigthNumber = parseInt(weight, 10);
  t.true(weigthNumber >= 30 && weigthNumber <= 90);
});

test(`Generate random ${contact.bloodType()} bloodType`, t => {
  const bloodType = contact.bloodType();
  const bloodTypeArray = utility.getValuesArray('personal_data.blood_type');
  t.true(contains(bloodTypeArray, bloodType));
});

test(`Generate random ${contact.occupation()} occupation`, t => {
  const occupation = contact.occupation();
  const occupationArray = utility.getValuesArray('personal_data.occupation');
  t.true(contains(occupationArray, occupation));
});
