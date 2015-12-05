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
var moment = require('moment');
var uuid = require('node-uuid');

var common = require('./common');

var propTypes = {
  userid: 'String value: a hash key to uniquely identify the user.',
  username: 'String value: e-mail address used for logging in.',
  termsAccepted: 'String value: an ISO 8601-formatted timestamp (with timezone offset) indicating when the user accepted the terms of use and privacy policy.',
  emails: 'An array containing the e-mail address serving as the user\'s `username`.'
};

var schema = {
  userid: function() {
    return uuid.v4().split('-')[0];
  }, 
  username: function() {
    return chance.email({domain: 'foobar.com'});
  }, 
  termsAccepted: function() {
    return moment().format();
  }
};

module.generate = function() {
  var base = common.generate(schema);
  return _.assign(base, {emails: [base.username]});
};

module.propTypes = propTypes;

module.exports = module;