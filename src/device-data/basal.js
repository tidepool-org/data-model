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
var RATE = '[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.\n\n**Range**: Many insulin pump manufacturers do not allow a basal rate higher than 10.0 or 15.0 units per hour; our new platform APIs will reject any value higher than 20.0 units per hour.';
var PREVIOUS = '[ingestion] An object representing the `basal` event just prior to this event or, equivalently, just the `id` of said object.\n\n[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.';
var getSuppressedDesc = function(type) {
  return  common.propTypes.OPTIONAL + format('[ingestion, storage, client] An object representing another `basal` event - namely, the event that is currently suppressed (inactive) because this %s basal is in effect.', type);
};
var DURATION_LIMIT_SCHEDULED = '\n\n**Range**: The new platform APIs expect this value to be >= 0 and <= 432000000 (the number of milliseconds in five days), as we assume that any single basal interval, even for a user running a flat-rate basal schedule, is broken up by a suspension of delivery in order to change the infusion site and/or insulin reservoir at least every five days.';
var DURATION_LIMIT_TEMP = '\n\n**Range**: The new platform APIs expect this value to be >= 0 and <= 86400000 (the number of milliseconds in twenty-four hours), as no pump manufacturer that we know of currently allows the programming of a temporary basal rate for longer than twenty-four hours.';

var schemas = {
  base: {
    type: {
      instance: TYPE,
      description: common.propTypes.stringValue(TYPE)
    }
  },
  scheduled: {
    deliveryType: {
      instance: DELIVERY_TYPES.scheduled,
      description: common.propTypes.stringValue(DELIVERY_TYPES.scheduled)
    },
    duration: {
      instance: common.duration,
      description: common.propTypes.OPTIONAL_JELLYFISH_REQUIRED + common.propTypes.duration() + DURATION_LIMIT_SCHEDULED
    },
    expectedDuration: {
      instance: 0,
      description: common.propTypes.ADDED_BY_JELLYFISH + common.propTypes.expectedDuration() + DURATION_LIMIT_SCHEDULED
    },
    rate: {
      instance: function() {
        // yield float rounded to nearest 0.025
        return Math.round(chance.floating({min: 0.025, max: 2})*40)/40;
      },
      description: RATE
    },
    previous: {
      instance: {},
      description: common.propTypes.OPTIONAL_JELLYFISH_NONEXISTENT + PREVIOUS
    },
    scheduleName: {
      instance: SCHEDULE_NAMES,
      description: common.propTypes.OPTIONAL + '[ingestion, storage, client] A string: the name of the basal schedule.',
      changelog: [common.changeLog.madeOptional('scheduleName', 2)]
    }
  },
  temp: {
    deliveryType: {
      instance: DELIVERY_TYPES.temp,
      description: common.propTypes.stringValue(DELIVERY_TYPES.temp)
    },
    duration: {
      instance: common.duration,
      description: common.propTypes.duration() + DURATION_LIMIT_TEMP
    },
    expectedDuration: {
      instance: 0,
      description: common.propTypes.ADDED_BY_JELLYFISH + common.propTypes.expectedDuration() + DURATION_LIMIT_TEMP,
      changelog: [common.changeLog.plannedImplementation('expectedDuration')]
    },
    percent: {
      instance: function() {
        // yield float rounded to nearest 0.05
        return Math.round(chance.floating({min:0, max:1})*20)/20;
      },
      description: common.propTypes.OPTIONAL + '[ingestion, storage, client] A floating point number >= 0 representing a percentage multiplier of the current basal rate to obtain the temp rate in units per hour.\n\n**Range**: The new platform APIs expect this value to be >= 0.0 and <= 10.0.'
    },
    previous: {
      instance: {},
      description: common.propTypes.OPTIONAL_JELLYFISH_NONEXISTENT + PREVIOUS
    },
    rate: {
      instance: 0,
      description: common.propTypes.OPTIONAL_JELLYFISH_REQUIRED + RATE
    },
    suppressed: {
      instance: {},
      description: getSuppressedDesc(DELIVERY_TYPES.temp)
    }
  },
  suspend: {
    deliveryType: {
      instance: DELIVERY_TYPES.suspend,
      description: common.propTypes.stringValue(DELIVERY_TYPES.suspend)
    },
    duration: {
      instance: common.duration,
      description: common.propTypes.OPTIONAL_JELLYFISH_REQUIRED + common.propTypes.duration() + DURATION_LIMIT_TEMP
    },
    expectedDuration: {
      instance: 0,
      description: common.propTypes.ADDED_BY_JELLYFISH + common.propTypes.expectedDuration() + DURATION_LIMIT_TEMP,
      changelog: [common.changeLog.plannedImplementation('expectedDuration')]
    },
    previous: {
      instance: {},
      description: common.propTypes.OPTIONAL_JELLYFISH_NONEXISTENT + PREVIOUS
    },
    suppressed: {
      instance: {},
      description: getSuppressedDesc(DELIVERY_TYPES.suspend)
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

module.propTypes = common.getPropTypes(schemas);

module.changeLog = common.getChangeLog(schemas);

module.exports = module;
