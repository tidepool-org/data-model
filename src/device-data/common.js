/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2015, Tidepool Project
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 * 
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */

var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();
var format = require('util').format;
var moment = require('moment');
var uuid = require('node-uuid');

var GLUCOSE_MM = 18.01559;

module.basalRateValue = function() {
  // yield float rounded to nearest 0.025
  return Math.round(chance.floating({min: 0.025, max: 2})*40)/40;
};

module.bgTargetNestedSchemas = {
  animas: ['target', 'range'],
  insulet: ['target', 'high'],
  medtronic: ['low', 'high'],
  tandem: ['target']
};

module.bgTarget = function(units, isIngestion, manufacturer) {
  var bgTargetFnMaker = function(range) {
    return function(units, isIngestion) {
      var value = Math.round(chance.natural(range)/5)*5;
      if (units === 'mg/dL') {
        return value;
      }
      else if (units === 'mmol/L' && isIngestion) {
        return module.transformToMmolLInput(value);
      }
      else {
        return module.transformToMmolLStorage(value);
      }
    };
  };

  var bgTargetGenerators = {
    low: bgTargetFnMaker({min: 60, max: 80}),
    high: bgTargetFnMaker({min: 120, max: 150}),
    target: bgTargetFnMaker({min: 85, max: 115}),
    range: bgTargetFnMaker({min: 5, max: 25})
  };

  var nestedSchema = module.bgTargetNestedSchemas[chance.pickone(module.PUMP_MANUFACTURERS)];
  if (manufacturer) {
    nestedSchema = module.bgTargetNestedSchemas[manufacturer];
  }

  var bgTarget = {};

  _.forEach(nestedSchema, function(bgTargetKey) {
    bgTarget[bgTargetKey] = bgTargetGenerators[bgTargetKey](units, isIngestion);
  });

  return bgTarget;
};

module.bgUnits = function(units, ingestion) {
  return ingestion ? units : 'mmol/L';
};

module.bgValue = function(units, ingestion) {
  var value = chance.natural({min: 20, max: 600});

  if (units === 'mg/dL') {
    return value;
  }
  else if (units === 'mmol/L' && ingestion) {
    return module.transformToMmolLInput(value);
  }
  else {
    return module.transformToMmolLStorage(value);
  }
};

module.bolusValue = function() {
  // yield float rounded to nearest 0.25
  return Math.round(chance.floating({
    min: 0.5,
    max: 10.0
  })*4)/4;
};

module.insulinCarbRatio = function() {
  return chance.natural({min: 5, max: 25});
};

module.insulinSensitivity = function(units, ingestion) {
  var value = chance.natural({min: 5, max: 100});
  if (units === 'mg/dL') {
    return value;
  }
  else if (units === 'mmol/L' && ingestion) {
    return module.transformToMmolLInput(value);
  }
  else {
    return module.transformToMmolLStorage(value);
  }
};

module.transformToMmolLInput = function(value) {
  return Number(Number(value/GLUCOSE_MM).toFixed(1));
};

module.transformToMmolLStorage = function(value) {
  return value/GLUCOSE_MM;
};

module.changeLog = {
  madeOptional: function(fieldName, schemaVersion) {
    return format('`_schemaVersion` %s: `%s` became **optional**.', schemaVersion, fieldName);
  },
  plannedChange: function(oldValue, newValue) {
    return format('`_schemaVersion` ? (future): We plan to migrate from `%s` to `%s` in the future.', oldValue, newValue);
  },
  plannedImplementation: function(fieldName) {
    return format('`_schemaVersion` ? (future): `%s` is implemented as described in this documentation. If the `_schemaVersion` listed here is "? (future)," all data up to and including the current `_schemaVersion` has **not** implemented `%s` as described.', fieldName, fieldName);
  },
  potentialAddedValue: function(fieldName, value) {
    return format('`_schemaVersion` ? (future): `%s` may be added as an accepted value for `%s` in the future.', value, fieldName);
  }
};

// generates a duration in increments from 30 mins. to 24 hours
module.duration = function() {
  var MS_IN_30_MINS = 1000 * 60 * 30;
  return chance.natural({min: 0, max: 48}) * MS_IN_30_MINS;
};

module.generate = function(schema, utc, format, manufacturer) {
  if (!schema) {
    console.error('Must provide a datatype schema as first param!');
  }
  if (!utc) {
    console.error('Must provide an ISO-formatted timestamp as second param!');
  }

  function client(obj) {
    var excluded = _.filter(Object.keys(obj), function(key) {
      return key.charAt(0) === '_' || key === 'createdTime';
    });
    return _.omit(obj, excluded);
  }
  function ingestion(obj) {
    var excluded = [
      '_active',
      '_groupId',
      '_schemaVersion',
      '_version',
      'createdTime',
      'guid',
      'id'
    ];
    return _.omit(obj, excluded);
  }
  function storage(obj) {
    return obj;
  }

  var schemaObj = _.mapValues(schema, function(field) {
    // compatibility while refactoring interface
    if (typeof field === 'object' && _.includes(Object.keys(field), 'instance')) {
      instance = field.instance;
    }
    else {
      throw new Error('Expected an object with an `instance` property and didn\'t get it :(');
    }

    if (typeof instance === 'function') {
      if (format === 'ingestion') {
        return instance('mg/dL', true, manufacturer);
      }
      return instance('mmol/L', false, manufacturer);
    }
    else if (Array.isArray(instance)) {
      return instance[chance.integer({min: 0, max: instance.length - 1})];
    }
    else {
      return instance;
    }
  });

  var tzOffset = new Date(utc).getTimezoneOffset();

  var commonFields = {
    _active: true,
    _groupId: 'abcdef',
    _schemaVersion: 0,
    _version: 0,
    clockDriftOffset: 0,
    conversionOffset: 0,
    createdTime: new Date(Date.parse(utc) + 5000).toISOString(),
    deviceId: 'DevId0987654321',
    deviceTime: moment.utc(Date.parse(utc))
      .subtract(tzOffset, 'minutes').toISOString().slice(0, -5),
    guid: uuid.v4(),
    id: module.makeId(),
    time: utc,
    timezoneOffset: -tzOffset,
    uploadId: 'SampleUploadId'
  };

  switch(format) {
    case 'client':
      commonFields = client(commonFields);
      break;
    case 'ingestion':
      commonFields = ingestion(commonFields);
      break;
    case 'storage':
      commonFields = storage(commonFields);
      break;
  }

  return _.assign({}, schemaObj, commonFields);
};

module.makeId = function() {
  return uuid.v4().replace(/-/g, '');
};

module.propTypes = {
  ADDED_BY_JELLYFISH: '> This field is **optional**. At present, it is **only** added by the jellyfish data ingestion service.\n\n',
  basalRate: function() {
    return '[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.';
  },
  bgUnits: function(hasSubtypes) {
    var ingestion = '[ingestion] One of two string values: `mg/dL` or `mmol/L`.\n\n';
    var elsewhere = '[storage, client] The string `mmol/L`.\n\n';
    var units = hasSubtypes ? 'See [units](../../units.md) for further explanation of blood glucose units.' :
      'See [units](../units.md) for further explanation of blood glucose units.';
    return ingestion + elsewhere + units;
  },
  bgValue: function() {
    var ingestion = '[ingestion] Blood glucose value in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.\n\n';
    var elsewhere = '[storage, client] Blood glucose value in mmol/L (float, potentially unrounded), with appropriately matching `units` field.';
    return ingestion + elsewhere;
  },
  boolean: function() {
    return '[ingestion, storage, client] A Boolean value: `true` or `false`.';
  },
  deviceTime: function() {
    return '[ingestion, storage, client] An ISO 8601 formatted timestamp *without* any timezone offset information—e.g., `' + new Date().toISOString().slice(0, -5) + '`.';
  },
  duration: function() {
    return '[ingestion, storage, client] An integer value representing a duration of time in milliseconds.';
  },
  eitherOr: function(eitherField, orField, type) {
    return format('**NB**: Either `%s` *or* `%s` (but not both!) must be present for a `%s` object to be valid.\n\n', eitherField, orField, type);
  },
  expectedDurationBasal: function() {
    return '[storage, client] An integer value representing an original programmed duration of time in milliseconds, copied from the `duration` field on ingestion when a following event has resulted in truncation of the original programmed duration.';
  },
  expectedDurationBolus: function() {
    return '[ingestion, storage, client] An integer value representing an original programmed duration of time in milliseconds when the programmed event did not complete due to interruption or user cancellation.';
  },
  insulinUnits: function() {
    return '[ingestion, storage, client] A floating point value representing units of insulin.';
  },
  maybeEmptyString: function() {
    return 'Must be a string value, and **may** be an empty string.';
  },
  stringValue: function(str) {
    return format('[ingestion, storage, client] The string `%s`.', str);
  },
  oneOfStringOptions: function(arr, extraIndent) {
    var divider = extraIndent || false ? '\n\t\t\t' : '\n\t\t';
    return 'Must be one of:' + divider + '`' + arr.join('`' + divider + '`') + '`';
  },
  oneOrMoreOfStringOptions: function(arr, extraIndent) {
    var divider = extraIndent || false ? '\n\t\t\t' : '\n\t\t';
    return 'One or more of:' + divider + '`' + arr.join('`' + divider + '`') + '`';
  },
  OPTIONAL: '> This field is **optional**.\n\n',
  OPTIONAL_JELLYFISH_REQUIRED: '> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.\n\n',
  OPTIONAL_JELLYFISH_NONEXISTENT: '> This field is **optional** when ingesting data through the jellyfish service but will no longer exist when ingesting data through the new platform APIs.\n\n'
};

function extractFromNested(schema, property) {
  function extract(field) {
    return field[property];
  }
  if (schema.base) {
    var subTypes = _.reject(Object.keys(schema), 'base');
    var basePropTypes = _.mapValues(schema.base, extract);
    return _.mapValues(_.omit(schema, 'base'), function(subSchema) {
      return _.assign(
        {},
        basePropTypes,
        _.mapValues(subSchema, extract)
      );
    });
  }
  else {
    return _.mapValues(schema, extract);
  }
}

module.getSummary = function(schema) {
  return extractFromNested(schema, 'summary')
};

module.getChangeLog = function(schema) {
  return extractFromNested(schema, 'changelog');
};

module.numericalTypes = {
  FLOATING_POINT_DEVICE_SIG_FIGS: 'Floating point value rounded to the appropriate significant figures for the device\'s precision.',
  FLOATING_POINT_MMOL: 'Floating point value representing a `mmol/L` value.',
  INTEGER_CARB_RATIO: 'Integer value representing grams of carbohydrate per unit of insulin.',
  INTEGER_CARBS: 'Integer value representing grams of carbohydrate.',
  INTEGER_MGDL: 'Integer value representing a `mg/dL` value.',
  INTEGER_MS: 'Integer value representing milliseconds.'
};

module.basalRateSummary = {
  description: module.propTypes.basalRate(),
  required: {
    jellyfish: true,
    platform: true
  },
  numericalType: module.numericalTypes.FLOATING_POINT_DEVICE_SIG_FIGS,
  range: {
    min: '0.0',
    max: '20.0'
  }
};

module.bgUnitsSummary = {
  description: module.propTypes.bgUnits(),
  required: {
    jellyfish: true,
    platform: true
  },
  range: module.propTypes.oneOfStringOptions(['mg/dL', 'mmol/L'])
};

module.bgValueSummary = {
  description: module.propTypes.bgValue(),
  required: {
    jellyfish: true,
    platform: true
  },
  numericalType: {
    'mg/dL': module.numericalTypes.INTEGER_MGDL,
    'mmol/L': module.numericalTypes.FLOATING_POINT_MMOL
  },
  range: {
    'mg/dL': {
      min: 0,
      max: 1000
    },
    'mmol/L': {
      min: '0.0',
      max: '55.0'
    }
  }
};

module.bolusInsulinSummary = {
  description: module.propTypes.insulinUnits(),
  required: {
    jellyfish: true,
    platform: true
  },
  numericalType: module.numericalTypes.FLOATING_POINT_DEVICE_SIG_FIGS,
  range: {
    min: '>= 0.0',
    max: '100.0'
  }
};

module.startSummary = {
  description: '[ingestion, storage, client] An integer encoding a start time as milliseconds from the start of a twenty-four hour day.',
  required: {
    jellyfish: true,
    platform: true
  },
  numericalType: module.numericalTypes.INTEGER_MS,
  range: {
    min: 0,
    max: '< 86400000'
  }
};

module.timeConstants = {
  MIN_DEVICE_TIME: '2007-01-01T00:00:00',
  MS_IN_24_HOURS: 864e5
};

module.PUMP_MANUFACTURERS = ['animas', 'insulet', 'medtronic', 'tandem'];
module.SCHEDULE_NAMES = ['Weekday', 'Weekend', 'Vacation', 'Stress', 'Very Active'];

// we don't upload 'medtronic' CGM settings yet
module.CGM_MANUFACTURERS = ['dexcom'];

module.exports = module;
