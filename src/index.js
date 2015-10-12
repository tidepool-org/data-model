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

module.exports = {
  basal: {
    generator: require('./device-data/basal'),
    title: 'Basal Insulin',
    subTypes: {
      key: 'deliveryType',
      list: [
        'injected',
        'scheduled',
        'temp',
        'suspended'
      ]
    },
    type: 'basal'
  },
  bloodKetone: {
    generator: require('./device-data/bloodKetone'),
    title: 'Blood Ketones',
    type: 'bloodKetone'
  },
  bolus: {
    generator: require('./device-data/bolus'),
    title: 'Bolus Insulin',
    subTypes: {
      key: 'subType',
      list: [
        'injected',
        'normal',
        'square',
        'dual/square'
      ]
    },
    type: 'bolus'
  },
  cbg: {
    generator: require('./device-data/cbg'),
    title: 'Continuous Blood Glucose',
    type: 'cbg'
  },
  cgmSettings: {
    deviceSpecific: ['Dexcom', 'Medtronic'],
    generator: require('./device-data/cgmSettings'),
    title: 'CGM Settings',
    type: 'cgmSettings'
  },
  common: {
    generator: require('./device-data/common').generate.bind(null, {}),
    title: 'Common Fields'
  },
  deviceEvent: {
    generator: require('./device-data/deviceEvent'),
    title: 'Miscellaneous (Diabetes) Device Events',
    subTypes: {
      key: 'subType',
      list: [
        'alarm',
        'prime',
        'reservoirChange',
        'status',
        'calibration',
        'timeChange'
      ]
    },
    type: 'deviceEvent'
  },
  pumpSettings: {
    deviceSpecific: ['Animas', 'Medtronic', 'Insulet', 'Tandem'],
    generator: require('./device-data/pumpSettings'),
    title: 'Insulin Pump Settings',
    type: 'pumpSettings'
  },
  smbg: {
    generator: require('./device-data/smbg'),
    title: 'Self-Monitored Blood Glucose',
    subTypes: {
      key: 'subType',
      list: [
        'manual',
        'linked'
      ]
    },
    type: 'smbg'
  },
  upload: {
    generator: require('./device-data/upload'),
    title: 'Upload Metadata',
    type: 'upload'
  },
  urineKetone: {
    generator: require('./device-data/urineKetone'),
    title: 'Urine Ketones',
    type: 'urineKetone'
  },
  wizard: {
    generator: require('./device-data/wizard'),
    title: 'Bolus Calculator Records',
    type: 'wizard'
  }
};