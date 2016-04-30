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
var common = require('./common');
var uuid = require('node-uuid');

var TYPE = 'deviceEvent';
var SUB_TYPES = [
  'alarm',
  'calibration',
  'prime',
  'reservoirChange',
  'status',
  'timeChange'
];
var ALARM_TYPES = [
  'low_insulin',
  'no_insulin',
  'low_power',
  'no_power',
  'occlusion',
  'no_delivery',
  'auto_off',
  'over_limit',
  'other'
];
var CAN_SUSPEND = [
  'no_insulin',
  'no_power',
  'occlusion',
  'no_delivery',
  'auto_off'
];
var PRIME_TARGETS = ['cannula', 'tubing'];

var schemas = {
  base: {
    type: {
      instance: TYPE,
      summary: {
        description: common.propTypes.stringValue(TYPE),
        required: {
          jellyfish: true,
          platform: true
        }
      }
    }
  },
  alarm: {
    subType: {
      instance: 'alarm',
      summary: {
        description: common.propTypes.stringValue('alarm'),
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    alarmType: {
      instance: function() {
        return chance.pickone(ALARM_TYPES);
      },
      summary: {
        description: '[ingestion, storage, client] String value encoding the type of alarm, with `other` as the catch-all/default category.',
        required: {
          jellyfish: true,
          platform: true
        },
        range: common.propTypes.oneOfStringOptions(ALARM_TYPES)
      }
    },
    status: {
      instance: function() {
        return uuid.v4().replace(/-/g, '');
      },
      summary: {
        description: common.propTypes.OPTIONAL + '[ingestion, storage, client] String `id` (or, equivalently, but just for the legacy jellyfish ingestion service, the object itself) of a type `deviceEvent`, subType `status` object that is logically connected to this alarm.',
        required: {
          jellyfish: false,
          platform: false
        }
      }
    }
  },
  calibration: {
    subType: {
      instance: 'calibration',
      summary: {
        description: common.propTypes.stringValue('calibration'),
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    units: {
      instance: common.bgUnits,
      summary: common.bgUnitsSummary
    },
    value: {
      instance: common.bgValue,
      summary: common.bgValueSummary
    }
  },
  prime: {
    subType: {
      instance: 'prime',
      summary: {
        description: common.propTypes.stringValue('prime'),
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    primeTarget: {
      instance: function() {
        return chance.pickone(PRIME_TARGETS)
      },
      summary: {
        description: '[ingestion, storage, client] String encoding the target of the priming action.',
        required: {
          jellyfish: true,
          platform: true
        },
        range: common.propTypes.oneOfStringOptions(PRIME_TARGETS)
      }
    },
    volume: {
      instance: function() {
        return chance.floating({fixed: 1, min: 8, max: 20});
      },
      summary: {
        description: common.propTypes.OPTIONAL + common.propTypes.insulinUnits(),
        required: {
          jellyfish: false,
          platform: false
        },
        range: {
          cannula: {
            min: '0.0',
            max: '3.0'
          },
          tubing: {
            min: '0.0',
            max: '100.0'
          }
        }
      }
    }
  }
};

module.generate = function(opts) {
  if (!_.includes(module.subTypes, opts.subType)) {
    console.error(format(
      'Device event subType must be one of: %s!',
      SUB_TYPES.join(', ')
    ));
    process.exit();
  }

  var deviceEvent = common.generate(
    _.assign({}, schemas.base, schemas[opts.subType]),
    opts.timestamp,
    opts.format
  );

  // some subType-specific transformers for polish
  if (opts.subType === 'alarm' && !_.includes(CAN_SUSPEND, deviceEvent.alarmType)) {
    delete deviceEvent.status;
  }
  if (opts.subType === 'prime' && deviceEvent.primeTarget === 'cannula') {
    deviceEvent.volume = chance.pickone(['0.3', '0.5', '0.7']);
  }

  return deviceEvent;
};

module.subTypes = SUB_TYPES;

module.summary = common.getSummary(schemas);

module.changeLog = common.getChangeLog(schemas);

module.exports = module;
