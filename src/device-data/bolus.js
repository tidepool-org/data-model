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

var TYPE = 'bolus';
var SUB_TYPES = {
  normal: 'normal',
  extended: 'square',
  combo: 'dual/square'
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
    }
  },
  normal: {
    subType: {
      instance: SUB_TYPES.normal,
      summary: {
        description: common.propTypes.stringValue(SUB_TYPES.normal),
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    normal: {
      instance: common.randomBolusValue,
      summary: common.bolusInsulinSummary
    },
    expectedNormal: {
      instance: 0,
      summary: {
        description: common.propTypes.OPTIONAL + common.propTypes.insulinUnits(),
        required: {
          jellyfish: false,
          platform: false
        },
        numericalType: common.numericalTypes.FLOATING_POINT_DEVICE_SIG_FIGS,
        range: {
          min: '> `normal`',
          max: '100.0'
        }
      }
    }
  },
  square: {
    subType: {
      instance: SUB_TYPES.extended,
      summary: {
        description: common.propTypes.stringValue(SUB_TYPES.extended),
        required: {
          jellyfish: true,
          platform: true
        }
      },
      changelog: [common.changeLog.plannedChange(SUB_TYPES.extended, Object.keys(SUB_TYPES)[1])]
    },
    extended: {
      instance: common.randomBolusValue,
      summary: common.bolusInsulinSummary
    },
    expectedExtended: {
      instance: 0,
      summary: {
        description: common.propTypes.OPTIONAL + common.propTypes.insulinUnits(),
        required: {
          jellyfish: false,
          platform: false
        },
        numericalType: common.numericalTypes.FLOATING_POINT_DEVICE_SIG_FIGS,
        range: {
          min: '> `extended`',
          max: '100.0'
        }
      }
    },
    duration: {
      instance: common.duration,
      summary: {
        description: common.propTypes.duration(),
        required: {
          jellyfish: true,
          platform: true
        },
        numericalType: common.numericalTypes.INTEGER_MS,
        range: {
          min: 0,
          max: 86400000
        }
      }
    },
    expectedDuration: {
      instance: 0,
      summary: {
        description: common.propTypes.OPTIONAL + common.propTypes.expectedDurationBolus(),
        required: {
          jellyfish: false,
          platform: false
        },
        numericalType: common.numericalTypes.INTEGER_MS,
        range: {
          min: '> `duration`',
          max: 86400000
        }
      }
    }
  }
};

schemas['dual/square'] = _.merge({}, schemas.normal, schemas.square, {
  subType: {
    instance: SUB_TYPES.combo,
    summary: {
      description: common.propTypes.stringValue(SUB_TYPES.combo),
      required: {
        jellyfish: true,
        platform: true
      }
    },
    changelog: [common.changeLog.plannedChange(SUB_TYPES.combo, Object.keys(SUB_TYPES)[2])]
  }
});

module.generate = function(opts) {
  if (!_.includes(module.subTypes, opts.subType)) {
    console.error(format(
      'Bolus subType must be one of: %s!',
      _.union(_.keys(SUB_TYPES), _.values(SUB_TYPES)).join(', ')
    ));
    process.exit();
  }

  var bolus = common.generate(
    _.assign({}, schemas.base, schemas[opts.subType]),
    opts.timestamp,
    opts.format
  );
  if (bolus.extended) {
    bolus.expectedExtended = Math.round(1.5 * bolus.extended * 40)/40;
    bolus.expectedDuration = 1.5 * bolus.duration;
    delete bolus.expectedNormal;
  }
  else if (bolus.normal) {
    bolus.expectedNormal = Math.round(1.2 * bolus.normal * 40)/40;
  }
  return bolus;
};

module.subTypes = _.values(SUB_TYPES);

module.summary = common.getSummary(schemas);

module.changeLog = common.getChangeLog(schemas);

module.exports = module;
