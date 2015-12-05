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

var common = require('./common');

var propTypes = {
  fullName: 'String value: first name, last name, and any other name parts the user chose to include when signing up.',
  patient: 'Object value: optional additional information stored as part of the data storage set up process for PWDs with data to store in the Tidepool platform.',
  about: 'String value: free-form "about me" text optionally entered by the PWD on sign-up.',
  birthday: 'String value: the PWD\'s birthday in YYYY-MM-DD format.',
  diagnosisDate: 'String value: the date the PWD was diagnosed with diabetes in YYYY-MM-DD format.'
};

var baseSchema = {
  fullName: function() {
    return chance.name({middle: chance.bool()});
  }
};

var patientSchema = {
  about: function() {
    return chance.sentence();
  },
  birthday: function() {
    return moment(chance.birthday()).format('YYYY-MM-DD');
  }
};

module.generate = function(opts) {
  var profile;
  var base = common.generate(baseSchema);
  if (opts.subType === 'patient') {
    profile = _.assign(base, {patient: common.generate(patientSchema)});
    profile.patient.diagnosisDate = moment(profile.patient.birthday)
      .add(chance.integer({min: 4, max: 16}), 'years')
      .add(chance.integer({min: 1, max: 15}), 'days')
      .format('YYYY-MM-DD');
  }
  return profile || base;
};

module.propTypes = propTypes;

module.exports = module;