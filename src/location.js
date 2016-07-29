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

  static geoJson({ fixed = 2 } = {}) {
    return geoJson({ fixed });
  }

  static geoHash({ length = 7 } = {}) {
    return geoHash({ length });
  }

  static altitude({ min = 0, max = 8488, fixed = 5, inFeet = false, asString = false } = {}) {
    const altitude = randomAltitude({ min, max, fixed });
    if (inFeet) {
      return asString ? `${altitude * 3.28084}ft` : altitude * 3.28084;
    }
    return asString ? `${altitude}m` : altitude;
  }

  static depth({ min = -10994, max = 0, fixed = 5, inFeet = false, asString = false } = {}) {
    const depth = randomDepth({ min, max, fixed });
    if (inFeet) {
      return asString ? `${depth * 3.28084}ft` : depth * 3.28084;
    }
    return asString ? `${depth}m` : depth;
  }

  static latitude({ min = -90, max = 90, fixed = 5 } = {}) {
    return randomLatitude({ min, max, fixed });
  }

  static longitude({ min = -180, max = 180, fixed = 5 } = {}) {
    return randomLongitude({ min, max, fixed });
  }

  static coordinates({ fixed = 5 } = {}) {
    return randomCoordinates({ fixed });
  }

  static country({ full = false } = {}) {
    return randomCountry({ full });
  }

  static language() {
    return randomLanguage();
  }

}

