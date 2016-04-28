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
    normal: {
      instance: function() {
        return Math.round(chance.floating({
          fixed: 2,
          min: 0.5,
          max: 10.0
        }))
      },
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
          min: '0.0',
          max: '100.0'
        }
      }
    }
  }
};

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
  bolus.expectedNormal = 1.25 * bolus.normal;
  return bolus;
};

module.subTypes = _.values(SUB_TYPES);

module.summary = common.getSummary(schemas);

module.changeLog = common.getChangeLog(schemas);

module.exports = module;
