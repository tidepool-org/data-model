/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2016, Tidepool Project
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
var moment = require('moment');

var common = require('./common');

var TYPE = 'upload';

var MANUFACTURERS = [
  'Abbott',
  'Animas',
  'Bayer',
  'Dexcom',
  'Insulet',
  'LifeScan',
  'Medtronic',
  'Tandems'
];

var DEVICE_TAGS = [
  'insulin-pump',
  'cgm',
  'bgm'
];

var TIME_PROCESSINGS = [
  'across-the-board-timezone',
  'utc-bootstrapping',
  'none'
];

var schema = {
  type: {
    instance: TYPE,
    summary: {
      description: common.propTypes.stringValue(TYPE),
      required: {
        jellyfish: true,
        platform: true
      }
    }
  },
  byUser: {
    instance: function() {
      return chance.guid().replace('-', '').slice(0,10);
    },
    summary: {
      description: '[ingestion, storage, client] A string consisting of the Tidepool `userId` of the uploading user.',
      required: {
        jellyfish: true,
        platform: true
      }
    }
  },
  computerTime: {
    instance: function() {
      return moment().format().slice(0,-6);
    },
    summary: {
      description: common.propTypes.deviceTime,
      required: {
        jellyfish: true,
        platform: true
      }
    }
  },
  deviceManufacturers: {
    instance: function() {
      return chance.pickone(MANUFACTURERS);
    },
    summary: {
      description: '[ingestion, storage, client] An array of string tags indicating the manufacturer(s) of the device.',
      required: {
        jellyfish: true,
        platform: true
      },
      range: common.propTypes.oneOfStringOptions(MANUFACTURERS)
    }
  },
  deviceModel: {
    instance: function() {
      return 'Devicey McDeviceface';
    },
    summary: {
      description: '[ingestion, storage, client] A string identifying the model of the device.',
      required: {
        jellyfish: true,
        platform: true
      }
    }
  },
  deviceSerialNumber: {
    instance: function() {
      return chance.hash({length: 8, casing: 'upper'});
    },
    summary: {
      description: '[ingestion, storage, client] A string encoding the device\'s serial number.',
      required: {
        jellyfish: true,
        platform: true
      },
      range: common.propTypes.maybeEmptyString()
    }
  },
  deviceTags: {
    instance: function() {
      return chance.pickset(DEVICE_TAGS, 2);
    },
    summary: {
      description: '[ingestion, storage, client] An array of string tags indicating the function(s) of the device.',
      required: {
        jellyfish: true,
        platform: true
      },
      range: common.propTypes.oneOfStringOptions(DEVICE_TAGS)
    }
  },
  timeProcessing: {
    instance: function() {
      return chance.pickone(TIME_PROCESSINGS);
    },
    summary: {
      description: '[ingestion, storage, client] A string indicating what variety of processing was used to create the `time` and related fields such as `timezoneOffset` on data in this upload.',
      required: {
        jellyfish: true,
        platform: true
      },
      range: common.propTypes.oneOfStringOptions(TIME_PROCESSINGS)
    }
  },
  timezone: {
    instance: function() {
      return chance.pickone(['US/Pacific', 'Pacific/Auckland', 'Europe/London', 'US/Eastern']);
    },
    summary: {
      description: '[ingestion, storage, client] A string timezone name from the [IANA timezone database](https://www.iana.org/time-zones).',
      required: {
        jellyfish: true,
        platform: true
      }
    }
  },
  uploadId: {
    instance: function() {
      return 'upid_' + chance.guid().replace('-', '').slice(0,12);
    },
    summary: {
      description: '[ingestion, storage, client] A string ID. Added to each event during data processing in the Tidepool uploader Chrome application.',
      required: {
        jellyfish: true,
        platform: true
      }
    }
  },
  version: {
    instance: function() {
      return '0.100.0';
    },
    summary: {
      description: '[ingestion, storage, client] A string encoding the version of the uploading client.',
      required: {
        jellyfish: true,
        platform: true
      }
    }
  }
};

module.generate = function(utc, format) {
  var upload = common.generate(schema, utc, format);
  return upload;
};

module.summary = common.getSummary(schema);

module.changeLog = common.getChangeLog(schema);

module.exports = module;
