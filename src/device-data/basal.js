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

var common = require('./common');

var DELIVERY_TYPES = {
  scheduled: 'scheduled',
  temp: 'temp',
  suspend: 'suspend'
};
var SCHEDULE_NAMES = ['Weekday', 'Weekend', 'Vacation', 'Stress', 'Very Active'];

var TYPE = 'basal';
var RATE = '[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.';
var PREVIOUS = '[ingestion] An object representing the `basal` event just prior to this event or, equivalently, just the `id` of said object.\n\n[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.';
var getSuppressedDesc = function(type) {
  return  common.propTypes.OPTIONAL + format('[ingestion, storage, client] An object representing another `basal` event - namely, the event that is currently suppressed (inactive) because this %s basal is in effect.', type);
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
  scheduled: {
    deliveryType: {
      instance: DELIVERY_TYPES.scheduled,
      summary: {
        description: common.propTypes.stringValue(DELIVERY_TYPES.scheduled),
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    duration: {
      instance: common.duration,
      summary: {
        description: common.propTypes.OPTIONAL_JELLYFISH_REQUIRED + common.propTypes.duration(),
        required: {
          jellyfish: false,
          platform: true
        },
        numericalType: common.numericalTypes.INTEGER_MS,
        range: {
          min: 0,
          max: 432000000
        }
      }
    },
    expectedDuration: {
      instance: 0,
      summary: {
        description: common.propTypes.ADDED_BY_JELLYFISH + common.propTypes.expectedDurationBasal(),
        required: {
          jellyfish: false,
          platform: false
        },
        numericalType: common.numericalTypes.INTEGER_MS,
        range: {
          min: '> `duration`',
          max: 432000000
        }
      }
    },
    rate: {
      instance: function() {
        // yield float rounded to nearest 0.025
        return Math.round(chance.floating({min: 0.025, max: 2})*40)/40;
      },
      summary: {
        description: RATE,
        required: {
          jellyfish: true,
          platform: true
        },
        numericalType: common.numericalTypes.FLOATING_POINT_DEVICE_SIG_FIGS,
        range: {
          min: '0.0',
          max: '20.0'
        }
      }
    },
    previous: {
      instance: {},
      summary: {
        description: common.propTypes.OPTIONAL_JELLYFISH_NONEXISTENT + PREVIOUS,
        required: {
          jellyfish: false,
          platform: null
        }
      }
    },
    scheduleName: {
      instance: SCHEDULE_NAMES,
      summary: {
        description: common.propTypes.OPTIONAL + '[ingestion, storage, client] A string: the name of the basal schedule.',
        required: {
          jellyfish: false,
          platform: false
        }
      },
      changelog: [common.changeLog.madeOptional('scheduleName', 2)]
    }
  },
  temp: {
    deliveryType: {
      instance: DELIVERY_TYPES.temp,
      summary: {
        description: common.propTypes.stringValue(DELIVERY_TYPES.temp),
        required: {
          jellyfish: true,
          platform: true
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
        description: common.propTypes.ADDED_BY_JELLYFISH + common.propTypes.expectedDurationBasal(),
        required: {
          jellyfish: false,
          platform: false
        },
        numericalType: common.numericalTypes.INTEGER_MS,
        range: {
          min: '> `duration`',
          max: 86400000
        }
      },
      changelog: [common.changeLog.plannedImplementation('expectedDuration')]
    },
    percent: {
      instance: function() {
        // yield float rounded to nearest 0.05
        return Math.round(chance.floating({min:0, max:1})*20)/20;
      },
      summary: {
        description: common.propTypes.OPTIONAL + '[ingestion, storage, client] A floating point number >= 0 representing a percentage multiplier of the current basal rate to obtain the temp rate in units per hour.',
        required: {
          jellyfish: false,
          platform: false
        },
        numericalType: 'Floating point value representing a percentage, where 1.0 represents 100%.',
        range: {
          min: '0.0',
          max: '10.0'
        }
      }
    },
    previous: {
      instance: {},
      summary: {
        description: common.propTypes.OPTIONAL_JELLYFISH_NONEXISTENT + PREVIOUS,
        required: {
          jellyfish: false,
          platform: null
        }
      }
    },
    rate: {
      instance: 0,
      summary: {
        description: common.propTypes.OPTIONAL_JELLYFISH_REQUIRED + RATE,
        required: {
          jellyfish: false,
          platform: true
        },
        numericalType: common.numericalTypes.FLOATING_POINT_DEVICE_SIG_FIGS,
        range: {
          min: '0.0',
          max: '20.0'
        }
      }
    },
    suppressed: {
      instance: {},
      summary: {
        description: getSuppressedDesc(DELIVERY_TYPES.temp),
        required: {
          jellyfish: false,
          platform: false
        }
      }
    }
  },
  suspend: {
    deliveryType: {
      instance: DELIVERY_TYPES.suspend,
      summary: {
        description: common.propTypes.stringValue(DELIVERY_TYPES.suspend),
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    duration: {
      instance: common.duration,
      summary: {
        description: common.propTypes.OPTIONAL_JELLYFISH_REQUIRED + common.propTypes.duration(),
        required: {
          jellyfish: false,
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
        description: common.propTypes.ADDED_BY_JELLYFISH + common.propTypes.expectedDurationBasal(),
        required: {
          jellyfish: false,
          platform: false
        },
        numericalType: common.numericalTypes.INTEGER_MS,
        range: {
          min: '> `duration`',
          max: 86400000
        }
      },
      changelog: [common.changeLog.plannedImplementation('expectedDuration')]
    },
    previous: {
      instance: {},
      summary: {
        description: common.propTypes.OPTIONAL_JELLYFISH_NONEXISTENT + PREVIOUS,
        required: {
          jellyfish: false,
          platform: null
        }
      }
    },
    suppressed: {
      instance: {},
      summary: {
        description: getSuppressedDesc(DELIVERY_TYPES.suspend),
        required: {
          jellyfish: false,
          platform: false
        }
      }
    }
  }
};

module.generate = function(opts) {
  if (!_.includes(module.deliveryTypes, opts.subType)) {
    console.error(format('Basal subType (= deliveryType) must be one of: %s!', module.deliveryTypes.join(', ')));
    process.exit();
  }
  var roundedTimestamp = moment(opts.timestamp).startOf('hour');
  var previous = common.generate(
    _.assign({}, schemas.base, schemas.scheduled),
    moment(roundedTimestamp).subtract(1, 'hour').toISOString(),
    'ingestion'
  );
  previous.duration = 36e5;
  var basal = common.generate(
    _.assign({}, schemas.base, schemas[opts.subType]),
    roundedTimestamp.toISOString(),
    opts.format
  );
  if (opts.format === 'ingestion') {
    basal.previous = _.omit(previous, ['expectedDuration', 'previous']);
  }
  else {
    delete basal.previous;
  }
  if (_.includes(['temp', 'suspend'], opts.subType)) {
    var suppressed = common.generate(
      _.assign({}, schemas.base, schemas.scheduled),
      roundedTimestamp.toISOString()
    );
    basal.suppressed = _.pick(suppressed, ['type', 'deliveryType', 'scheduleName', 'rate'])
    if (basal.percent) {
      basal.rate = basal.percent * suppressed.rate;
    }
    basal.expectedDuration = 1.2 * basal.duration;
  }
  else {
    if (basal.expectedDuration != null) {
      delete basal.expectedDuration;
    }
  }
  return basal;
};

module.deliveryTypes = _.values(DELIVERY_TYPES);

module.summary = common.getSummary(schemas);

module.changeLog = common.getChangeLog(schemas);

module.exports = module;
