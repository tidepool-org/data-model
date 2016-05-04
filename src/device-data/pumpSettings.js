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
var uuid = require('node-uuid');

var common = require('./common');
var wizard = require('./wizard');

var TYPE = 'pumpSettings';

function getStarts() {
  var starts = [0].concat(chance.pickset(
    _.range(1800000, 86400000, 1800000),
    chance.natural({min: 0, max: 4})
  ));
  // flip a coin and maybe return just a 0 start for a "flat rate" schedule
  return chance.bool() ? [0] : _.sortBy(starts);
}

var NORMAL_SCHEDULE = 'Normal';

var TANDEM_SCHEDULES = [
  NORMAL_SCHEDULE,
  'Sick'
];

var bgTarget = {
  instance: function(units, isIngestion, manufacturer) {
    return _.map(getStarts(), function(aStart) {
      return _.assign({start: aStart}, common.bgTarget(units, isIngestion, manufacturer));
    });
  },
  summary: {
    description: common.propTypes.eitherOr('bgTarget', 'bgTargets', TYPE) + '[ingestion, storage, client] An array of objects describing the PWD\'s target blood glucose at different times of day; the format of this object varies according to the make of the insulin pump.',
    nested: true,
    nestedPropertiesIntro: 'Each blood glucose target segment object in the array contains a subset of the following properties',
    keys: _.assign({}, wizard.summary.bgTarget.keys, {
      start: {
        summary: common.startSummary
      }
    })
  }
};

var bgTargets = {
  instance: function(units, isIngestion, manufacturer) {
    var bgTargets = {};
    _.each(TANDEM_SCHEDULES, function(scheduleName) {
      bgTargets[scheduleName] = _.map(getStarts(), function(aStart) {
        _.assign({start: aStart}, common.bgTarget(units, isIngestion, 'tandem'));
      });
    });

    return bgTargets;
  },
  summary: {
    description: common.propTypes.eitherOr('bgTargets', 'bgTarget', TYPE) +  '[ingestion, storage, client] A set of key-value pairs encoding the PWD\'s programmed blood glucose target schedules, where each key is a schedule name and each value is an array of blood glucose target segment objects.\n\nSee [`bgTarget`](#bgtarget) above for documentation of the fields within each blood glucose segment object.'
  }
};

var carbRatio = {
  instance: function() {
    return _.map(getStarts(), function(aStart) {
      return {
        amount: common.insulinCarbRatio(),
        start: aStart
      };
    });
  },
  summary: {
    description: common.propTypes.eitherOr('carbRatio', 'carbRatios', TYPE) + '[ingestion, storage, client] An array of objects encoding the PWD\'s insulin carb ratio starting at a time in milliseconds from the start of a twenty-four hour day.',
    nested: true,
    nestedPropertiesIntro: 'Each carb ratio segment object in the array contains the following properties',
    keys: {
      amount: {
        summary: wizard.summary.insulinCarbRatio
      },
      start: {
        summary: common.startSummary
      }
    }
  }
};

var carbRatios = {
  instance: function() {
    var carbRatios = {};
    _.each(TANDEM_SCHEDULES, function(scheduleName) {
      carbRatios[scheduleName] = _.map(getStarts(), function(aStart) {
        return {
          amount: common.insulinCarbRatio(),
          start: aStart
        };
      });
    });

    return carbRatios;
  },
  summary: {
    description: common.propTypes.eitherOr('carbRatios', 'carbRatio', TYPE) +  '[ingestion, storage, client] A set of key-value pairs encoding the PWD\'s programmed carb ratio schedules, where each key is a schedule name and each value is an array of carb ratio segment objects.\n\nSee [`carbRatio`](#carbratio) above for documentation of the fields within each carb ratio segment object.'
  }
};

var insulinSensitivity = {
  instance: function() {
    return _.map(getStarts(), function(aStart) {
      return {
        amount: common.insulinSensitivity(),
        start: aStart
      };
    });
  },
  summary: {
    description: common.propTypes.eitherOr('insulinSensitivity', 'insulinSensitivities', TYPE) + '[ingestion, storage, client] An array of objects encoding the PWD\'s insulin sensitivity starting at a time in milliseconds from the start of a twenty-four hour day.',
    nested: true,
    nestedPropertiesIntro: 'Each insulin sensitivity segment object in the array contains the following properties',
    keys: {
      amount: {
        summary: wizard.summary.insulinSensitivity
      },
      start: {
        summary: common.startSummary
      }
    }
  }
};

var insulinSensitivities = {
  instance: function() {
    var insulinSensitivities = {};
    _.each(TANDEM_SCHEDULES, function(scheduleName) {
      insulinSensitivities[scheduleName] = _.map(getStarts(), function(aStart) {
        return {
          amount: common.insulinSensitivity(),
          start: aStart
        };
      });
    });

    return insulinSensitivities;
  },
  summary: {
    description: common.propTypes.eitherOr('insulinSensitivities', 'insulinSensitivity', TYPE) +  '[ingestion, storage, client] A set of key-value pairs encoding the PWD\'s programmed insulin sensitivity schedules, where each key is a schedule name and each value is an array of insulin sensitivity segment objects.\n\nSee [`insulinSensitivity`](#insulinsensitivity) above for documentation of the fields within each insulin sensitivity segment object.'
  }
};

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
    },
    activeSchedule: {
      instance: NORMAL_SCHEDULE,
      summary: {
        description: '[ingestion, storage, client] A string value encoding the name of the PWD\'s active basal schedule.',
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    basalSchedules: {
      instance: function(units, isIngestion, manufacturer) {
        var scheduleNames = manufacturer === 'tandem' ?
          TANDEM_SCHEDULES :
          [NORMAL_SCHEDULE].concat(chance.pickset(common.SCHEDULE_NAMES, chance.natural({min: 0, max: 2})));
        var basalSchedules = {};
        _.each(scheduleNames, function(scheduleName) {
          // flip a coin to decide whether to generate a flat rate schedule
          basalSchedules[scheduleName] = _.map(getStarts(), function(aStart) {
            return {
              start: aStart,
              rate: common.basalRateValue()
            };
          });
        });

        return basalSchedules;
      },
      summary: {
        description: '[ingestion, storage, client] A set of key-value pairs encoding the PWD\'s programmed basal schedules, where each key is a basal schedule name and each value is an array of basal schedule segment objects.',
        required: {
          jellyfish: true,
          platform: true
        },
        nested: true,
        nestedPropertiesIntro: 'Each basal schedule segment object within each array value contains the following properties',
        keys: {
          rate: {
            summary: common.basalRateSummary
          },
          start: {
            summary: common.startSummary
          }
        }
      }
    },
    bgTarget: _.assign({}, bgTarget, {
      changelog: [
        '`_schemaVersion` 2: The minimal `{target: [val], start: [milliseconds]}` schema was added as valid to handle Tandem\'s `bgTarget` settings.',
        '`_schemaVersion` 2: The nonexistent (in currently handled devices) `{low: [val], target: [val], high: [val], start: [milliseconds]}` schema was *removed*.'
      ]
    }),
    bgTargets: bgTargets,
    carbRatio: carbRatio,
    carbRatios: carbRatios,
    insulinSensitivity: insulinSensitivity,
    insulinSensitivities: insulinSensitivities,
    units: {
      instance: function(units) {
        return {
          carbs: 'grams',
          bg: units
        };
      },
      summary: {
        description: '[ingestion, storage, client] An object encoding the units for carbohydrates and blood glucose on the PWD\'s insulin pump.',
        required: {
          jellyfish: true,
          platform: true
        },
        nested: true,
        nestedPropertiesIntro: 'Contains the following properties',
        keys: {
          carbs: {
            summary: {
              description: common.propTypes.OPTIONAL_JELLYFISH_REQUIRED + '[ingestion, storage, client] A string value encoding the (universal) units for carbohydrate input as `grams`.',
              required: {
                jellyfish: false,
                platform: true
              },
              range: 'The string `grams`.'
            }
          },
          bg: {
            summary: {
              description: common.propTypes.OPTIONAL_JELLYFISH_REQUIRED + '[ingestion, storage, client] A string value encoding the blood glucose units exposed in the user interface on this insulin pump.',
              required: {
                jellyfish: false,
                platform: true
              },
              range: common.propTypes.oneOfStringOptions(['mg/dL', 'mmol/L'])
            }
          }
        }
      },
      changelog: [common.changeLog.potentialAddedValue('units.carbs', 'exchanges')]
    }
  },
  animas: {
    bgTarget: bgTarget,
    carbRatio: carbRatio,
    insulinSensitivity: insulinSensitivity
  },
  insulet: {
    bgTarget: bgTarget,
    carbRatio: carbRatio,
    insulinSensitivity: insulinSensitivity
  },
  medtronic: {
    bgTarget: bgTarget,
    carbRatio: carbRatio,
    insulinSensitivity: insulinSensitivity
  },
  tandem: {
    bgTargets: bgTargets,
    carbRatios: carbRatios,
    insulinSensitivities: insulinSensitivities
  }
};

module.generate = function(opts) {
  if (!_.includes(common.PUMP_MANUFACTURERS, opts.subType)) {
    console.error(format('pumpSettings subType (= manufacturer) must be one of: %s!', common.PUMP_MANUFACTURERS.join(', ')));
    process.exit();
  }

  var eitherOrs = [
    'bgTarget',
    'bgTargets',
    'carbRatio',
    'carbRatios',
    'insulinSensitivity',
    'insulinSensitivities'
  ];

  var settings = common.generate(
    _.assign({}, _.omit(schemas.base, eitherOrs), schemas[opts.subType]),
    opts.timestamp,
    opts.format,
    opts.subType
  );

  return settings;
};

module.summary = _.assign(
  {},
  _.mapValues(schemas.base, function(val) { return val.summary; })
);

module.changeLog = _.assign(
  {},
  _.mapValues(schemas.base, function(val) { return val.changelog; })
);

module.exports = module;
