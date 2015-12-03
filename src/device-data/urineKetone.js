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

var Chance = require('chance');
var chance = new Chance();
var common = require('./common');

var values = ['negative', 'trace', 'small', 'moderate', 'large'];

var propTypes = {
  type: common.propTypes.stringValue('urineKetone'),
  value: common.propTypes.oneOfStringOptions(
      '[ingestion, storage, client] String value representating a qualitative measurement of urine ketone concentration.',
      values
    )
};

var schema = {
  type: 'urineKetone',
  value: function() {
    return values[chance.integer({min: 0, max: values.length - 1})]
  }
};

module.generate = function(utc, format) {
  var bk = common.generate(schema, utc, format);
  return bk;
};

module.propTypes = propTypes;

module.exports = module;