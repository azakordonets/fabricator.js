import geoJson from 'random-geojson';
import geoHash from 'random-geohash';
import randomAltitude from 'random-altitude';
import randomDepth from 'random-depth';
import randomLatitude from 'random-latitude';
import randomLongitude from 'random-longitude';
import randomCoordinates from 'random-coordinates';
import randomCountry from 'random-country';
import randomLanguage from 'random-lang';

export default class Location {

  static geoJson(params = { fixed: 2 }) {
    return geoJson(params);
  }

  static geoHash(params = { length: 7 }) {
    return geoHash(params);
  }

  static altitude(params = { min: 0, max: 8488, fixed: 5, inFeet: false, asString: false }) {
    const altitude = randomAltitude(params);
    if (params.inFeet) {
      return params.asString ? `${altitude * 3.28084}ft` : altitude * 3.28084;
    }
    return params.asString ? `${altitude}m` : altitude;
  }

  static depth(params = { min: -10994, max: 0, fixed: 5, inFeet: false, asString: false }) {
    const depth = randomDepth(params);
    if (params.inFeet) {
      return params.asString ? `${depth * 3.28084}ft` : depth * 3.28084;
    }
    return params.asString ? `${depth}m` : depth;
  }

  static latitude(params = { min: -90, max: 90, fixed: 5 }) {
    return randomLatitude(params);
  }

  static longitude(params = { min: -180, max: 180, fixed: 5 }) {
    return randomLongitude(params);
  }

  static coordinates(params = { fixed: 5 }) {
    return randomCoordinates(params);
  }

  static country(params = { full: false }) {
    return randomCountry(params);
  }

  static language() {
    return randomLanguage();
  }

}

