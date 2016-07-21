import test from 'ava';
import Fabricator from '../src/index.js';
import UtilityService from '../src/utility';

const userAgent = new Fabricator().userAgent();
const util = new UtilityService();
const linuxProcessorList = util.getValuesArray('user_agent.linux_processor');

test(`Should generate random ${userAgent.macProcessor()} mac processor`, t => {
  const macProcessor = userAgent.macProcessor();
  const macProcessorList = util.getValuesArray('user_agent.mac_processor');
  t.true(macProcessorList.indexOf(macProcessor) > -1);
});

test(`Should generate random ${userAgent.linuxProcessor()} linux processor`, t => {
  const linuxProcessor = userAgent.linuxProcessor();
  t.true(linuxProcessorList.indexOf(linuxProcessor) > -1);
});

test(`Should generate random ${userAgent.browserName()} browser`, t => {
  const browser = userAgent.browserName();
  const browsersList = util.getValuesArray('user_agent.browser');
  t.true(browsersList.indexOf(browser) > -1);
});

test(`Should generate random ${userAgent.windowsPlatformToken()}`, t => {
  const winToken = userAgent.windowsPlatformToken();
  const winTokenList = util.getValuesArray('user_agent.windows');
  t.true(winTokenList.indexOf(winToken) > -1);
});

test(`Should generate random ${userAgent.linuxPlatformToken()} linux token`, t => {
  const linuxToken = userAgent.linuxPlatformToken();
  const part1 = linuxToken.split('Linux')[0];
  const part2 = linuxToken.split('Linux')[1].trim();
  t.is(part1, 'X11; ');
  t.true(linuxProcessorList.indexOf(part2) > -1);
});

test(`Should generate random ${userAgent.macPlatformToken()} mac platform token`, t => {
  const macToken = userAgent.macPlatformToken();
  const part2 = macToken.split(' Mac OS X ')[1];
  t.regex(part2, /10_[5-8]_[0-9]/);
});

test(`Should generate random ${userAgent.chrome()} chrome name`, t => {
  const chrome = userAgent.chrome();
  const keyWords = ['(KHTML, like Gecko)', 'Chrome', 'AppleWebKit', 'Safari'];
  keyWords.map(keyword => t.true(chrome.indexOf(keyword) > -1));
});

test(`Should generate random ${userAgent.firefox()} firefox agent`, t => {
  const firefox = userAgent.firefox();
  const keyWords = ['Gecko', 'Firefox', 'rv:'];
  keyWords.map(keyword => t.true(firefox.indexOf(keyword) > -1));
});

test(`Should generate random ${userAgent.opera()} opera agent`, t => {
  const opera = userAgent.opera();
  const keyWords = ['Presto', 'Opera', 'Version'];
  keyWords.map(keyword => t.true(opera.indexOf(keyword) > -1));
  t.true(opera.indexOf('en-US') > -1 || opera.indexOf('sl-SI') > -1 || opera.indexOf('it-IT') > -1);
});

test(`SHould generate random ${userAgent.ie()} IE agent`, t => {
  const ie = userAgent.ie();
  const keyWords = ['Mozilla/5.0 (compatible; MSIE', 'Trident'];
  keyWords.map(keyword => t.true(ie.indexOf(keyword) > -1));
});

test(`Should generate random ${userAgent.browser()} browser agent`, t => {
  const browser = userAgent.browser();
  t.true(browser.indexOf('Firefox') > -1 ||
    browser.indexOf('Chrome') > -1 ||
    browser.indexOf('Gecko') > -1 ||
    browser.indexOf('MSIE') > -1 ||
    browser.indexOf('Presto') > -1);
});
