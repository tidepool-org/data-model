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

module.bgUnits = function(units, ingestion) {
  return ingestion ? units : 'mmol/L';
};

module.bgValue = function(units, ingestion) {
  var value = chance.natural({min: 20, max: 600});
  if (units === 'mg/dL') {
    return value;
  }
  else if (units === 'mmol/L' && ingestion) {
    return Number(Number(value/GLUCOSE_MM).toFixed(1));
  }
  else {
    return value/GLUCOSE_MM;
  }
};

module.changeLog = {
  madeOptional: function(fieldName, schemaVersion) {
    return format('`_schemaVersion` %s: `%s` became **optional**.', schemaVersion, fieldName);
  },
  plannedImplementation: function(fieldName) {
    return format('`_schemaVersion` ? (future): `%s` is implemented as described in this documentation. If the `_schemaVersion` listed here is "? (future)," all data up to and including the current `_schemaVersion` has **not** implemented `expectedDuration` as described.', fieldName);
  }
};

// generates a duration in increments from 30 mins. to 24 hours
module.duration = function() {
  var MS_IN_30_MINS = 1000 * 60 * 30;
  return chance.natural({min: 0, max: 48}) * MS_IN_30_MINS;
};

module.generate = function(schema, utc, format) {
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
        return instance('mg/dL', true);
      }
      return instance('mmol/L', false);
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
    id: uuid.v4().replace(/-/g, ''),
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

module.propTypes = {
  ADDED_BY_JELLYFISH: '> This field is **optional**. At present, it is **only** added by the jellyfish data ingestion service.\n\n',
  bgUnits: function() {
    var ingestion = '[ingestion] One of two string values: `mg/dL` or `mmol/L`.\n\n';
    var elsewhere = '[storage, client] The string `mmol/L`.\n\n';
    var units = 'See [units](../units.md) for further explanation of blood glucose units.';
    return ingestion + elsewhere + units;
  },
  bgValue: function() {
    var ingestion = '[ingestion] Blood glucose value in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.\n\n';
    var elsewhere = '[storage, client] Blood glucose value in mmol/L (float, potentially unrounded), with appropriately matching `units` field.';
    return ingestion + elsewhere;
  },
  duration: function() {
    return '[ingestion, storage, client] An integer value representing a duration of time in milliseconds.';
  },
  expectedDuration: function() {
    return '[storage, client] An integer value representing an original programmed duration of time in milliseconds, copied from the `duration` field on ingestion when a following event has resulted in truncation of the original programmed duration.';
  },
  stringValue: function(str) {
    return format('[ingestion, storage, client] The string `%s`.', str);
  },
  oneOfStringOptions: function(arr) {
    return 'Must be one of: `' + arr.join('`, `') + '`.';
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
  INTEGER_MGDL: 'Integer value representing a `mg/dL` value.',
  INTEGER_MS: 'Integer value representing milliseconds.'
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

module.exports = module;
