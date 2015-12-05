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

var user = require('./user');
var profile = require('./profile');

module.generate = function(opts) {
  var memberships = [];
  var loggedInUser = _.pick(user.generate(), 'userid');
  loggedInUser.profile = profile.generate(opts);
  memberships.push(loggedInUser);

  for (var i = 0; i < chance.integer({min: 1, max: 5}); ++i) {
    memberships.push(_.assign(
      _.pick(user.generate(), 'userid'),
      {profile: profile.generate({subType: 'patient'})}
    ));
  }
  return memberships;
};

module.exports = module;