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

var bolus = require('./bolus');
var common = require('./common');

var TYPE = 'wizard';

var boundDesc = function(bound) {
  return '[ingestion, storage, client] An integer encoding the ' + bound + ' bound of a PWD\'s blood glucose target.';
};

var bgTargetNestedSchemas = {
  animas: ['target', 'range'],
  insulet: ['target', 'high'],
  medtronic: ['low', 'high'],
  tandem: ['target']
};

var bgTargetFnMaker = function(range) {
  return function(units, isIngestion) {
    var value = Math.round(chance.natural(range)/5)*5;
    if (units === 'mg/dL') {
      return value;
    }
    else if (units === 'mmol/L' && isIngestion) {
      return common.transformToMmolLInput(value);
    }
    else {
      return common.transformToMmolLStorage(value);
    }
  };
};

var bgTargetGenerators = {
  low: bgTargetFnMaker({min: 60, max: 80}),
  high: bgTargetFnMaker({min: 120, max: 150}),
  target: bgTargetFnMaker({min: 85, max: 115}),
  range: bgTargetFnMaker({min: 5, max: 25})
};

var recommendedInsulinSummary = {
  description: common.propTypes.OPTIONAL + common.propTypes.insulinUnits(),
  required: {
    jellyfish: false,
    platform: false
  },
  numericalType: common.numericalTypes.FLOATING_POINT_DEVICE_SIG_FIGS,
  range: common.bolusInsulinSummary.range
};

var schema = {
  type: {
    instance: TYPE,
    summary: {
      description: common.propTypes.stringValue(TYPE),
      required: {
        jellyfish: true,
        platform: true
      }
    }
  },
  bgInput: {
    instance: common.bgValue,
    summary: {
      description: common.propTypes.OPTIONAL + common.propTypes.bgValue(),
      required: {
        jellyfish: false,
        platform: false
      },
      numericalType: {
        'mg/dL': common.numericalTypes.INTEGER_MGDL,
        'mmol/L': common.numericalTypes.FLOATING_POINT_MMOL
      },
      range: {
        'mg/dL': {
          min: 0,
          max: 1000
        },
        'mmol/L': {
          min: '0.0',
          max: '55.0'
        }
      }
    }
  },
  bgTarget: {
    instance: function(units, isIngestion, manufacturer) {
      var nestedSchema = bgTargetNestedSchemas[chance.pickone(common.MANUFACTURERS)];
      if (manufacturer) {
        nestedSchema = bgTargetNestedSchemas[manufacturer];
      }

      var bgTarget = {};

      _.forEach(nestedSchema, function(bgTargetKey) {
        bgTarget[bgTargetKey] = bgTargetGenerators[bgTargetKey](units, isIngestion);
      });

      return bgTarget;
    },
    summary: {
      description: common.propTypes.OPTIONAL + '[ingestion, storage, client] An object describing the PWD\'s target blood glucose; the format of this object varies according to the make of the insulin pump.',
      required: {
        jellyfish: false,
        platform: false
      },
      nested: true,
      nestedSchemas: bgTargetNestedSchemas,
      keys: {
        low: {
          instance: function() {
            return chance.integer({min: 70, max: 120});
          },
          summary: {
            description: boundDesc('lower'),
            numericalType: {
              'mg/dL': common.numericalTypes.INTEGER_MGDL,
              'mmol/L': common.numericalTypes.FLOATING_POINT_MMOL
            },
            range: {
              'mg/dL': {
                min: 40,
                max: 200
              },
              'mmol/L': {
                min: 2.2,
                max: 11.1
              }
            }
          }
        },
        high: {
          instance: function() {
            return chance.integer({min: 100, max: 150});
          },
          summary: {
            description: boundDesc('upper'),
            numericalType: {
              'mg/dL': common.numericalTypes.INTEGER_MGDL,
              'mmol/L': common.numericalTypes.FLOATING_POINT_MMOL
            },
            range: {
              'mg/dL': {
                min: 80,
                max: 200
              },
              'mmol/L': {
                min: 4.4,
                max: 11.1
              }
            }
          }
        },
        target: {
          instance: function() {
            return chance.integer({min: 70, max: 150});
          },
          summary: {
            description: '[ingestion, storage, client] An integer encoding the PWD\'s target blood glucose as a single value.',
            numericalType: {
              'mg/dL': common.numericalTypes.INTEGER_MGDL,
              'mmol/L': common.numericalTypes.FLOATING_POINT_MMOL
            },
            range: {
              'mg/dL': {
                min: 80,
                max: 200
              },
              'mmol/L': {
                min: 4.4,
                max: 11.1
              }
            }
          }
        },
        range: {
          instance: function() {
            return chance.integer({min: 5, max: 20});
          },
          summary: {
            description: '[ingestion, storage, client] An integer encoding the allowed deviation above or below the PWD\'s target blood glucose.',
            numericalType: 'An integer value representing an allowed range +/- an associated target.',
            range: {
              min: 0,
              max: 50
            }
          }
        }
      }
    }
  },
  bolus: {
    instance: function() {
      var aBolus = bolus.generate({
        timestamp: new Date().toISOString(),
        subType: chance.pickone(bolus.subTypes)
      });
      return aBolus.id;
    },
    summary: {
      description: common.propTypes.OPTIONAL_JELLYFISH_REQUIRED + '[ingestion] The `id` of the bolus resulting from this `wizard` event, or—for the legacy jellyfish ingestion service *only*—the object itself.\n\n[storage, client] The `id` of the bolus resulting from this `wizard` event.',
      required: {
        jellyfish: false,
        platform: true
      }
    }
  },
  carbInput: {
    instance: function() {
      return chance.integer({min: 5, max: 150});
    },
    summary: {
      description: common.propTypes.OPTIONAL + '[ingestion, storage, client] An integer encoding the PWD\'s carbohydrate input into the bolus calculator.',
      required: {
        jellyfish: false,
        platform: false
      },
      numericalType: common.numericalTypes.INTEGER_CARBS,
      range: {
        min: 0,
        max: 1000
      }
    }
  },
  insulinCarbRatio: {
    instance: function() {
      return chance.natural({min: 5, max: 25});
    },
    summary: {
      description: common.propTypes.OPTIONAL + '[ingestion, storage, client] An integer encoding the grams of carbohydrate "covered" by one unit of insulin for the PWD.',
      required: {
        jellyfish: false,
        platform: false
      },
      numericalType: common.numericalTypes.INTEGER_CARB_RATIO,
      range: {
        min: 0,
        max: 250
      }
    }
  },
  insulinOnBoard: {
    instance: function() {
      return chance.floating({min: 0, max: 25, fixed: 3});
    },
    summary: {
      description: common.propTypes.OPTIONAL + common.propTypes.insulinUnits(),
      required: {
        jellyfish: false,
        platform: false
      },
      numericalType: common.numericalTypes.FLOATING_POINT_DEVICE_SIG_FIGS,
      range: {
        min: '0.0',
        max: '250.0'
      }
    }
  },
  insulinSensitivity: {
    instance: function() {
      return chance.natural({min: 5, max: 100});
    },
    summary: {
      description: common.propTypes.OPTIONAL + '[ingestion] A numerical representation of the estimation of blood glucose value drop per unit of insulin delivered in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.\n\n[storage, client] A numerical representation of the estimation of blood glucose value drop in mmol/L (float, potentially unrounded), with appropriately matching `units` field.',
      required: {
        jellyfish: false,
        platform: false
      },
      numericalType: {
        'mg/dL': common.numericalTypes.INTEGER_MGDL,
        'mmol/L': common.numericalTypes.FLOATING_POINT_MMOL
      },
      range: {
        'mg/dL': {
          min: '> 0',
          max: 500
        },
        'mmol/L': {
          min: '> 0.0',
          max: '27.7'
        }
      }
    }
  },
  recommended: {
    instance: function() {
      // filled in later in generate
      return {};
    },
    summary: {
      description: common.propTypes.OPTIONAL + '[ingestion, storage, client] An object encoding the amount of insulin calculated as a recommended dose to "cover" the `bgInput` and `carbInput`, possibly taking into account the `insulinOnBoard`.',
      required: {
        jellyfish: false,
        platform: false
      },
      nested: true,
      keys: {
        carb: {
          instance: common.randomBolusValue,
          summary: recommendedInsulinSummary
        },
        correction: {
          instance: common.randomBolusValue,
          summary: {
            description: recommendedInsulinSummary.description,
            required: recommendedInsulinSummary.required,
            numericalType: recommendedInsulinSummary.numericalType,
            range: {
              min: '-' + common.bolusInsulinSummary.range.max,
              max: common.bolusInsulinSummary.range.max
            }
          }
        },
        net: {
          instance: 0,
          summary: {
            description: recommendedInsulinSummary.description,
            required: recommendedInsulinSummary.required,
            numericalType: recommendedInsulinSummary.numericalType,
            range: {
              min: '-' + common.bolusInsulinSummary.range.max,
              max: common.bolusInsulinSummary.range.max
            }
          }
        }
      }
    }
  },
  units: {
    instance: common.bgUnits,
    summary: common.bgUnitsSummary
  }
};

module.generate = function(utc, format) {
  var wizard = common.generate(schema, utc, format);

  function round(val) {
    return Math.round(val*4)/4;
  }

  var bgToReach = wizard.bgTarget.target ? (wizard.bgTarget.target + wizard.bgTarget.range || 0) : wizard.bgTarget.high;

  wizard.recommended.carb= round(wizard.carbInput/wizard.insulinCarbRatio);

  wizard.recommended.correction = round((wizard.bgInput - bgToReach)/wizard.insulinSensitivity);

  wizard.recommended.net = Math.round((wizard.recommended.carb + wizard.recommended.correction - wizard.insulinOnBoard)*4)/4;
  if (wizard.recommended.net < 0) {
    wizard.recommended.net = 0;
  }

  return wizard;
};

module.summary = common.getSummary(schema);

module.changeLog = common.getChangeLog(schema);

module.exports = module;
