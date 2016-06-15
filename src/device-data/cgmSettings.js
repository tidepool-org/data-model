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
var format = require('util').format;

var TYPE = 'cgmSettings';

var common = require('./common');

function ingestionAlert(alertType, bgField) {
  return format('[ingestion] An object representing a %s alert setting, with `%s` in mg/dL (integer) or mmol/L (float) and the appropriately matching `units` value.\n\n', alertType, bgField);
}

function otherAlert(alertType, bgField) {
  return format('[storage, client] An object representing a %s alert setting, with `%s` in mmol/L (float, potentially unrounded) and the appropriately matching `units` value.', alertType, bgField);
}

var booleanRange = '`true`, `false`';

var SNOOZE_DESC = '[ingestion, storage, client] An integer value representing minimum time between alerts in milliseconds.';

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
  dexcom: {
    highAlerts: {
      instance: function() {
        return {
          enabled: chance.bool(),
          level: Math.round(chance.natural({min: 180, max: 240})/5)*5,
          snooze: 15*60*1000 * chance.natural({min: 3, max: 6})
        };
      },
      summary: {
        description: ingestionAlert('high glucose', 'level') + otherAlert('high glucose', 'level'),
        required: {
          jellyfish: true,
          platform: true
        },
        nested: true,
        nestedPropertiesIntro: 'Contains the following properties',
        keys: {
          enabled: {
            summary: {
              description: common.propTypes.boolean,
              required: {
                jellyfish: true,
                platform: true
              },
              range: booleanRange,
            }
          },
          level: {
            summary: common.bgValueSummary
          },
          snooze: {
            summary: {
              description: SNOOZE_DESC,
              required: {
                jellyfish: true,
                platform: true
              },
              numericalType: common.numericalTypes.INTEGER_MS,
              range: {
                min: 0,
                max: common.timeConstants.MS_IN_24_HOURS
              }
            }
          }
        }
      },
    },
    lowAlerts: {
      instance: function() {
        return {
          enabled: chance.bool(),
          level: Math.round(chance.natural({min: 60, max: 90})/5)*5,
          snooze: 15*60*1000 * chance.natural({min: 1, max: 4})
        };
      },
      summary: {
        description: ingestionAlert('low glucose', 'level') + otherAlert('low glucose', 'level'),
        required: {
          jellyfish: true,
          platform: true
        },
        nested: true,
        nestedPropertiesIntro: 'Contains the following properties',
        keys: {
          enabled: {
            summary: {
              description: common.propTypes.boolean,
              required: {
                jellyfish: true,
                platform: true
              },
              range: booleanRange,
            }
          },
          level: common.bgValueSummary,
          snooze: {
            summary: {
              description: SNOOZE_DESC,
              required: {
                jellyfish: true,
                platform: true
              },
              range: {
                min: 0,
                max: common.timeConstants.MS_IN_24_HOURS
              }
            }
          }
        }
      },
    },
    transmitterId: {
      instance: function() {
        return chance.guid().slice(0,5).toUpperCase();
      },
      summary: {
        description: '[ingestion, storage, client] A string transmitter ID.',
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    units: {
      instance: common.bgUnits,
      summary: {
        description: common.propTypes.bgUnits(true),
        required: {
          jellyfish: true,
          platform: true
        },
        range: common.propTypes.oneOfStringOptions(['mg/dL', 'mmol/L'])
      }
    }
  }
};

module.generate = function(opts) {
  if (!_.includes(common.CGM_MANUFACTURERS, opts.subType)) {
    console.error(format('cgmSettings subType (= manufacturer) must be one of: %s!', common.CGM_MANUFACTURERS.join(', ')));
    process.exit();
  }

  var settings = common.generate(
    _.assign({}, schemas.base, schemas[opts.subType]),
    opts.timestamp,
    opts.format,
    opts.subType
  );

  return settings;
};

module.summary = common.getSummary(schemas);

module.changeLog = common.getChangeLog(schemas);

module.exports = module;
