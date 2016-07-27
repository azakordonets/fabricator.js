import test from 'ava';
import Location from '../src/location';

test(`Should generate random ${Location.geoJson()} geoJson() with default length`, t => {
  const geoJson = Location.geoJson().trim();
  geoJson.split(', ').forEach(value => {
    t.true(value.split('.')[1].length <= 2);
  });
});

test(`Should generate random ${Location.geoJson({ fixed: 6 })} geoJson() with custom length`, t => {
  const customLength = 6;
  const geoJson = Location.geoJson({ fixed: customLength }).trim();
  geoJson.split(', ').forEach(value => {
    t.true(value.split('.')[1].length <= customLength);
  });
});

test(`Should generate random ${Location.geoHash()} geoHash with default length`, t => {
  const geoHash = Location.geoHash();
  t.true(geoHash.length <= 7);
});

test(`Should generate random ${Location.geoHash({ fixed: 6 })} geoHash with custom length`, t => {
  const customLength = 6;
  const geoHash = Location.geoHash({ length: customLength });
  t.true(geoHash.length <= customLength);
});

test(`Should generate random ${Location.altitude()} altitude in meters`, t => {
  const altitude = Location.altitude();
  t.true(altitude >= 0);
  t.true(altitude <= 8840);
});

test(`Should generate random ${Location.altitude({ inFeet: true, asString: false })}` +
  ' altitude in meters', t => {
  const altitude = Location.altitude({ asString: true });
  const altitudeLength = altitude.length;
  t.is(altitude.substring(altitudeLength - 1, altitudeLength), 'm');
});

test(`Should generate random ${Location.altitude({ inFeet: true, asString: true })}` +
  ' altitude in feet', t => {
  const altitude = Location.altitude({ inFeet: true, asString: true });
  const altitudeLength = altitude.length;
  t.is(altitude.substring(altitudeLength - 2, altitudeLength), 'ft');
});

test(`Should generate random ${Location.depth()} depth in meters`, t => {
  const depth = Location.depth();
  t.true(depth >= -10994);
  t.true(depth <= 0);
});

test(`Should generate random ${Location.depth({ inFeet: true, asString: false })}` +
  ' depth in meters', t => {
  const depth = Location.depth({ asString: true });
  const depthLength = depth.length;
  t.is(depth.substring(depthLength - 1, depthLength), 'm');
});

test(`Should generate random ${Location.depth({ inFeet: true, asString: true })}` +
  ' depth in feet', t => {
  const depth = Location.depth({ inFeet: true, asString: true });
  const depthLength = depth.length;
  t.is(depth.substring(depthLength - 2, depthLength), 'ft');
});

test(`Should generate random ${Location.latitude()} latitude with default length`, t => {
  const latitude = Location.latitude();
  t.true(latitude >= -90);
  t.true(latitude <= 90);
  t.true(String(latitude).split('.')[1].length <= 7);
});

test(`Should generate random ${Location.latitude({ fixed: 2 })} latitude with custom length`, t => {
  const customLength = 2;
  const latitude = Location.latitude({ fixed: customLength });
  t.true(latitude >= -90);
  t.true(latitude <= 90);
  t.true(String(latitude).split('.')[1].length <= customLength);
});

test(`Should generate random ${Location.longitude()} longitude with default length`, t => {
  const longitude = Location.longitude();
  t.true(longitude >= -180);
  t.true(longitude <= 180);
  t.true(String(longitude).split('.')[1].length <= 7);
});

test(`Should generate random ${Location.longitude({ fixed: 2 })}` +
    'longitude with custom length', t => {
  const customLength = 2;
  const longitude = Location.longitude({ fixed: customLength });
  t.true(longitude >= -180);
  t.true(longitude <= 180);
  t.true(String(longitude).split('.')[1].length <= customLength);
});

test(`Should generate random ${Location.coordinates()} coordinates with default length`, t => {
  const coordinates = Location.coordinates();
  const latitude = coordinates.split(', ')[0];
  t.true(latitude >= -90);
  t.true(latitude <= 90);
  t.regex(latitude, /^(-)?\d+(\.\d{1,5})?$/);

  const longitude = coordinates.split(', ')[1];
  t.true(longitude >= -180);
  t.true(longitude <= 180);
  t.regex(longitude, /^(-)?\d+(\.\d{1,5})?$/);
});

test(`Should generate random ${Location.coordinates({ fixed: 2 })}` +
 'coordinates with custom length', t => {
  const coordinates = Location.coordinates({ fixed: 2 });
  const latitude = coordinates.split(', ')[0];
  t.true(latitude >= -90);
  t.true(latitude <= 90);
  t.regex(latitude, /^(-)?\d+(\.\d{1,2})?$/);

  const longitude = coordinates.split(', ')[1];
  t.true(longitude >= -180);
  t.true(longitude <= 180);
  t.regex(longitude, /^(-)?\d+(\.\d{1,2})?$/);
});

test(`Should generate random ${Location.country()} country in short version`, t => {
  const country = Location.country();
  t.regex(country, /\w{1,3}/);
});

test(`Should generate random ${Location.country({ full: true })} country in long version`, t => {
  const country = Location.country({ full: true });
  t.regex(country, /\w+/);
});

test(`Should generate random ${Location.language()} language`, t => {
  const language = Location.language();
  t.true(language.length >= 1);
});

