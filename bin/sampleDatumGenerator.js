#!/usr/bin/env node
/*
  Usage: sampleDatumGenerator [options] <type>

  Options:

    -h, --help                    output usage information
    -c, --clipboard               copy resulting sample JSON to clipboard
    -d, --datetime <value>        ISO-formatted datetime for datum
    -f, --format <value>          data format of client, ingestion, storage
    -m, --manufacturer <value>    manufacturer of diabetes device
    --subtype, --subType <value>  subType for this datum
*/

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
var chalk = require('chalk');
var commander = require('commander');
var copy = require('copy-paste').copy;

var generators = require('../src/');

var type, format = 'client';

commander.usage('[options] <type>')
  .option('-c, --clipboard', 'copy resulting sample JSON to clipboard')
  .option('-d, --datetime <value>', 'ISO-formatted datetime for datum', new Date().toISOString())
  .option('-f, --format <value>', 'data format of client, ingestion, storage', /^(client|ingestion|storage)$/i, 'client')
  .option('-m, --manufacturer <value>', 'manufacturer of diabetes device', null)
  .option('--subtype, --subType <value>', 'subType for this datum', null)
  .parse(process.argv);

if (_.isEmpty(commander.args)) {
  console.log();
  console.error(chalk.bold.red('You must provide a Tidepool device data type as the last command-line argument!'));
  console.log();
  process.exit();
}
else {
  type = commander.args[0];
  if (!generators[type] || typeof generators[type].generator !== 'function') {
    console.log();
    console.error(chalk.bold.red('Sorry, no generator defined yet for %s :('), type);
    console.log();
    process.exit();
  }
}

if (commander.ingestion) {
  format = 'ingestion';
}
if (commander.storage) {
  format = 'storage';
}

var result;
if (commander.subType) {
  result = generators[type].generator({
    format: commander.format,
    subType: commander.subType,
    timestamp: commander.datetime
  });
}
else {
  result = generators[type].generator(commander.datetime, commander.format);
}

console.log();
console.log(chalk.bold.cyan('~#*~#* TIDEPOOL SAMPLE DATUM GENERATOR *#~*#~'));
console.log();
console.log(chalk.gray('Type:'), type);
if (commander.subType) {
  console.log(chalk.gray('Subtype:'), commander.subType);
}
if (commander.manufacturer) {
  console.log(chalk.gray('Manufacturer:'), commander.manufacturer);
}
console.log(chalk.gray('Datetime:'), commander.datetime);
console.log(chalk.gray('Data model format:'), commander.format);
console.log();
console.log(result);
console.log();

if (commander.clipboard) {
  copy(JSON.stringify(result, null, 2), function() {
    console.log(chalk.magenta('Copied sample datum JSON to clipboard \\o/'));
    console.log();
  });
}
