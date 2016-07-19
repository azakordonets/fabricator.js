import UtilityService from './utility';
import Alphanumeric from './alpha';
export default class UserAgent {
  constructor(lang = 'us') {
    this.lang = lang;
    this.util = new UtilityService(this.lang);
    this.alpha = new Alphanumeric(this.lang);
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
    return templates[this.alpha.randomNumber(0, templates.length)];
  }
}
