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

var basal = require('./device-data/basal');
var bloodKetone = require('./device-data/bloodKetone');
var bolus = require('./device-data/bolus');
var cbg = require('./device-data/cbg');
var cgmSettings = require('./device-data/cgmSettings');
var deviceEvent = require('./device-data/deviceEvent');
var pumpSettings = require('./device-data/pumpSettings');
var smbg = require('./device-data/smbg');
var upload = require('./device-data/upload');
var wizard = require('./device-data/wizard');

module.exports = {
  basal: {
    generator: basal.generate,
    summary: basal.summary,
    changeLog: basal.changeLog,
    title: 'Basal Insulin',
    subtitle: 'Basal deliveryType',
    subTypes: basal.deliveryTypes,
    type: 'basal'
  },
  bloodKetone: {
    generator: bloodKetone.generate,
    summary: bloodKetone.summary,
    changeLog: bloodKetone.changeLog,
    title: 'Blood Ketones',
    type: 'bloodKetone'
  },
  bolus: {
    generator: bolus.generate,
    summary: bolus.summary,
    changeLog: bolus.changeLog,
    title: 'Bolus Insulin',
    subtitle: 'Bolus subType',
    subTypes: bolus.subTypes,
    type: 'bolus'
  },
  cbg: {
    generator: cbg.generate,
    summary: cbg.summary,
    changeLog: cbg.changeLog,
    title: 'Continuous Blood Glucose',
    type: 'cbg'
  },
  cgmSettings: {
  },
  common: {
    generator: require('./device-data/common').generate.bind(null, {}),
    title: 'Common Fields'
  },
  deviceEvent: {
    generator: deviceEvent.generate,
    summary: deviceEvent.summary,
    changeLog: deviceEvent.changeLog,
    title: 'Device Events',
    subtitle: 'Device event subType',
    subTypes: deviceEvent.subTypes,
    type: 'deviceEvent'
  },
  pumpSettings: {
  },
  smbg: {
    generator: smbg.generate,
    summary: smbg.summary,
    changeLog: smbg.changeLog,
    title: 'Self-Monitored Blood Glucose',
    type: 'smbg'
  },
  upload: {
  },
  wizard: {
  }
};
