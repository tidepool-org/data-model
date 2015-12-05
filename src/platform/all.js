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

var user = require('./user');
var profile = require('./profile');
var memberships = require('./memberships');

module.generate = function(opts) {
  var loggedInUser = user.generate();
  var loggedInUsersProfile = profile.generate(opts);
  var loggedInUsersMemberships = memberships.generate(opts);
  loggedInUsersMemberships[0] = _.assign({},
    {userid: loggedInUser.userid},
    {profile: loggedInUsersProfile}
  );
  return {
    user: loggedInUser,
    profile: loggedInUsersProfile,
    memberships: loggedInUsersMemberships
  };
};

module.exports = module;