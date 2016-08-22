import Url from 'url';
import UtilityService from '../utility';
import Words from '../words';

function makeUrlParamsString(params) {
  const paramsKeys = Object.keys(params);
  const paramsStringArray = [];
  paramsStringArray.push('?');
  paramsKeys.forEach(key => paramsStringArray.push(`${key}=${params[key]}&`));
  const paramsString = paramsStringArray.join('');
  return paramsString.substring(0, paramsString.length - 1);
}

function makeUrl(scheme, host, domain, port, path, params, useEncoding) {
  const urlArray = [];
  urlArray.push(scheme, '://', host);

  if (host.indexOf('.') === -1) {
    urlArray.push(domain);
  }

  if (port !== 80) {
    urlArray.push(`:${port}`);
  }

  if (path.startsWith('/')) {
    urlArray.push(path);
  } else {
    urlArray.push(`/${path}`);
  }

  const paramsString = makeUrlParamsString(params);
  if (useEncoding) {
    urlArray.push(encodeURIComponent(paramsString));
  } else {
    urlArray.push(paramsString);
  }

  return urlArray.join('');
}


export default class UrlBuilder {

  constructor(lang = 'us') {
    this.lang = lang;
    this.util = new UtilityService(lang);
    this.words = new Words(lang);
    this.scheme = 'http';
    this.host = this.words.words(2).join('').replace('\'', '')
                                            .replace('-', '')
                                            .replace('.', '');
    this.domain = this.util.getValue('internet.domain_suffix');
    this.port = 80;
    this.params = { q: 'test' };
    this.path = '/getEntity';
    this.useEncoding = false;
  }

  withScheme(scheme) {
    this.scheme = scheme;
    return this;
  }

  withHost(host) {
    this.host = host;
    return this;
  }

  withParams(params) {
    this.params = params;
    return this;
  }

  withPath(path) {
    this.path = path;
    return this;
  }

  withEncoding() {
    this.useEncoding = true;
    return this;
  }

  asString() {
    return makeUrl(this.scheme,
      this.host,
      this.domain,
      this.port,
      this.path,
      this.params,
      this.useEncoding);
  }

  asUrl() {
    return Url.parse(this.asString());
  }
}

