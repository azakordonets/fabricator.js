import UtilityService from './utility';
import Alphanumeric from './alpha';
import Calendar from './calendar';
export default class UserAgent {
  constructor(lang = 'us') {
    this.lang = lang;
    this.util = new UtilityService(this.lang);
    this.alpha = new Alphanumeric(this.lang);
    this.calendar = new Calendar(this.lang);
  }

  macProcessor() {
    return this.util.getValue('user_agent.mac_processor');
  }

  linuxProcessor() {
    return this.util.getValue('user_agent.linux_processor');
  }

  browserName() {
    return this.util.getValue('user_agent.browser');
  }

  windowsPlatformToken() {
    return this.util.getValue('user_agent.windows');
  }

  linuxPlatformToken() {
    return `X11; Linux ${this.linuxProcessor()}`;
  }

  macPlatformToken() {
    return `Macintosh; ${this.macProcessor()} Mac OS X 10_` +
      `${this.alpha.randomNumber({ min: 5, max: 8 })}_${this.alpha.randomNumber({ max: 9 })}`;
  }

  chrome() {
    const saf = `${this.alpha.randomNumber({ min: 531, max: 536 })}` +
      `${this.alpha.randomNumber({ max: 2 })}}`;

    const base = ` AppleWebKit/${saf} (KHTML, like Gecko) ` +
      `Chrome/${this.alpha.randomNumber({ min: 13, max: 15 })}` +
      `.0.${this.alpha.randomNumber({ min: 800, max: 899 })} Safari/${saf}`;

    const templates = [`(${this.linuxPlatformToken()})${base}`,
      `(${this.macPlatformToken()})${base}`,
      `(${this.windowsPlatformToken()})${base}`,
    ];
    return templates[this.alpha.randomNumber({ max: templates.length - 1 })];
  }

  firefox() {
    const version = [
      `Gecko/${this.calendar.date().setFullYear(2011).toString()}` +
      ` Firefox/${this.alpha.randomNumber({ min: 4, max: 15 })}.0`,
      `Gecko/${this.calendar.date().setFullYear(2011).toString()}` +
      ` Firefox/3.6.${this.alpha.randomNumber({ min: 1, max: 20 })}`,
      `Gecko/${this.calendar.date().setFullYear(2011).toString()} Firefox/3.8`,
    ];

    const windowsTemplate = `(${this.windowsPlatformToken()};` +
      `${this.util.getValue('user_agent.langs')};` +
      `rv:1.9.${this.alpha.randomNumber({ max: 2 })}.20)` +
      ` ${version[this.alpha.randomNumber({ max: version.length - 1 })]}`;

    const linuxTemplate = `(${this.linuxPlatformToken()};` +
      `rv:1.9.${this.alpha.randomNumber({ min: 5, max: 7 })}.20)` +
      ` ${version[this.alpha.randomNumber({ max: version.length - 1 })]}`;

    const macTemplate = `(${this.macPlatformToken()};` +
      `rv:1.9.${this.alpha.randomNumber({ min: 2, max: 6 })}.20)` +
      ` ${version[this.alpha.randomNumber({ max: version.length - 1 })]}`;

    const platforms = [windowsTemplate, linuxTemplate, macTemplate];
    return platforms[this.alpha.randomNumber({ max: platforms.length - 1 })];
  }

  opera() {
    const platforms = [
      `(${this.linuxPlatformToken()}; ${this.util.getValue('user_agent.langs')})` +
      ` Presto/2.9.${this.alpha.randomNumber({ min: 160, max: 190 })}` +
      ` Version/${this.alpha.randomNumber({ min: 10, max: 12 })}.00`,
      `(${this.windowsPlatformToken()}; ${this.util.getValue('user_agent.langs')})` +
      ` Presto/2.9.${this.alpha.randomNumber({ min: 160, max: 190 })}` +
      ` Version/${this.alpha.randomNumber({ min: 10, max: 12 })}.00`,
    ];
    return `Opera/${this.alpha.randomNumber({ min: 8, max: 9 })}` +
           `.${this.alpha.randomNumber({ min: 10, max: 99 })}.` +
          `${platforms[this.alpha.randomNumber({ max: platforms.length - 1 })]}`;
  }

  ie() {
    return 'Mozilla/5.0 (compatible; ' +
      `MSIE ${this.alpha.randomNumber({ min: 5, max: 9 })}.0; ` +
      `${this.windowsPlatformToken()}; ` +
      `Trident/${this.alpha.randomNumber({ min: 3, max: 5 })}.` +
      `${this.alpha.randomNumber({ max: 1 })})`;
  }

  browser() {
    const browsersArray = [this.chrome(), this.firefox(), this.opera(), this.ie()];
    return browsersArray[this.alpha.randomNumber({ max: browsersArray.length - 1 })];
  }
}
