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
var STATUSES = ['suspended', 'resumed'];
var AGENTS = ['manual', 'automatic'];
var TIME_CHANGE_REASONS = [
  'from_daylight_savings',
  'to_daylight_savings',
  'travel',
  'correction',
  'other'
];

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
      instance: ALARM_TYPES,
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
      summary: {
        description: common.propTypes.bgUnits(true),
        required: {
          jellyfish: true,
          platform: true
        },
        range: common.propTypes.oneOfStringOptions(['mg/dL', 'mmol/L'])
      }
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
      instance: PRIME_TARGETS,
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
  },
  reservoirChange: {
    subType: {
      instance: 'reservoirChange',
      summary: {
        description: common.propTypes.stringValue('reservoirChange'),
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    status: {
      instance: function() {
        return uuid.v4().replace(/-/g, '');
      },
      summary: {
        description: common.propTypes.OPTIONAL + '[ingestion, storage, client] String `id` (or, equivalently, but just for the legacy jellyfish ingestion service, the object itself) of a type `deviceEvent`, subType `status` object that is logically connected to this reservoirChange.',
        required: {
          jellyfish: false,
          platform: false
        }
      }
    }
  },
  status: {
    subType: {
      instance: 'status',
      summary: {
        description: common.propTypes.stringValue('status'),
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    status: {
      instance: function() {
        return STATUSES[0];
      },
      summary: {
        description: '[ingestion, storage, client] String value encoding insulin pump status as `suspended` or `resumed`.',
        required: {
          jellyfish: true,
          platform: true
        },
        range: {
          jellyfish: common.propTypes.oneOfStringOptions(STATUSES, true),
          platform: 'The string `suspended`.'
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
          max: '< ∞'
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
          max: '< ∞'
        }
      }
    },
    reason: {
      instance: function() {
        return {
          suspended: chance.pickone(AGENTS),
          resumed: chance.pickone(AGENTS)
        };
      },
      summary: {
        description: '[ingestion, storage, client] An object with two key-value pairs encoding the cause of a `suspended` or `resumed` event as `manual` (user-initiated) or `automatic` (pump-initiated).',
        required: {
          jellyfish: true,
          platform: true
        },
        range: common.propTypes.oneOfStringOptions(AGENTS)
      }
    }
  },
  timeChange: {
    subType: {
      instance: 'timeChange',
      summary: {
        description: common.propTypes.stringValue('timeChange'),
        required: {
          jellyfish: true,
          platform: true
        }
      }
    },
    change: {
      instance: function() {
        var from = new Date();
        var to = new Date(from.valueOf() - (57 * 60 * 1000) + 25000);
        return {
          from: from.toISOString().slice(0,-5),
          to: to.toISOString().slice(0,-5),
          agent: 'manual',
          reasons: ['travel', 'correction'],
          timezone: chance.pickone(common.timeConstants.TIMEZONES)
        };
      },
      summary: {
        description: '[ingestion, storage, client] An object encoding as much information as possible about a diabetes device display time change event.',
        nested: true,
        nestedPropertiesIntro: 'Contains the following properties',
        keys: {
          from: {
            summary: {
              description: common.propTypes.deviceTime(),
              required: {
                jellyfish: true,
                platform: true
              },
              range: {
                min: common.timeConstants.MIN_DEVICE_TIME,
                max: 'none'
              }
            }
          },
          to: {
            summary: {
              description: common.propTypes.deviceTime(),
              required: {
                jellyfish: true,
                platform: true
              },
              range: {
                min: common.timeConstants.MIN_DEVICE_TIME,
                max: 'none'
              }
            }
          },
          agent: {
            summary: {
              description: '[ingestion, storage, client] A string encoding the agent of the diabetes device display time change event.',
              required: {
                jellyfish: true,
                platform: true
              },
              range: common.propTypes.oneOfStringOptions(AGENTS)
            }
          },
          reasons: {
            summary: {
              description: common.propTypes.OPTIONAL + '[ingestion, storage, client] An array of tags describing the reason(s) for the diabetes device display time change.',
              required: {
                jellyfish: false,
                platform: false
              },
              range: common.propTypes.oneOrMoreOfStringOptions(TIME_CHANGE_REASONS)
            }
          },
          timezone: {
            summary: {
              description: common.propTypes.OPTIONAL + '[ingestion, storage, client] The name of the timezone that applies to the result of this diabetes device display time change.',
              required: {
                jellyfish: false,
                platform: false
              },
              range: 'Must be a string timezone name from the IANA Timezone Database.'
            }
          }
        },
        required: {
          jellyfish: true,
          platform: true
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
  if (opts.subType === 'status') {
    deviceEvent.expectedDuration = 1.2 * deviceEvent.duration;
  }

  return deviceEvent;
};

module.subTypes = SUB_TYPES;

module.summary = common.getSummary(schemas);

module.changeLog = common.getChangeLog(schemas);

module.exports = module;
