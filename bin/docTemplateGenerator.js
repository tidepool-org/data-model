#!/usr/bin/env node
/*
  Usage: docTemplateGenerator [options] <type>

  Options:

    -h, --help          output usage information
    -p, --path <value>  path to docs directory
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
var util = require('util');
var fs = require('fs');

var generators = require('../src/');

var type;

commander.usage('[options] <type>')
  .option('-p, --path <value>', 'path to docs directory', '../device-data/')
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

console.log();
console.log(chalk.bold.cyan('~#*~#* TIDEPOOL DATA MODEL DOC TEMPLATE GENERATOR *#~*#~'));
console.log();
console.log(chalk.gray('Type:'), type);
console.log();

var commonFields = generators.common.generator(new Date().toISOString(), 'storage');

function formatHeader(format) {
  return util.format('### example (%s)\n', format.toLowerCase());
}

function exampleObject(type) {
  return generators[type].generator(new Date().toISOString(), 'storage');
}

function exampleJSON(type, format) {
  return '```json\n' + JSON.stringify(
    generators[type].generator(new Date().toISOString(), format),
    null,
    '\t'
  ) + '\n```\n';
}

function fieldSectionHeader(field) {
  return util.format('### %s\n', field);
}

function commonSectionForField(field) {
  var fieldSection = [fieldSectionHeader(field)];
  fieldSection.push('\n[TODO]\n');
  return fieldSection;
}

function sectionForField(field) {
  var fieldSection = [fieldSectionHeader(field)];
  if (commonFields[field] !== undefined) {
    fieldSection.push('See [common fields](./common.md).\n');
  }
  else {
    fieldSection.push('[TODO]\n');
  }
  return fieldSection;
}

if (type === 'common') {
  var doc = [util.format('## %s\n', generators[type].title)];
  doc.push('Jump to...\n');
  doc = doc.concat(Object.keys(commonFields).map(function(field) {
    return util.format('  - [%s](#%s)', field, field.toLowerCase());
  }));
  doc.push('\n');
  doc = doc.concat(_.flatten(Object.keys(commonFields).map(function(field) {
    return commonSectionForField(field);
  })));
  doc = doc.concat(['### example (all possible fields)\n\n' + exampleJSON(type, 'storage')]);
}
else {
  var doc = [util.format('## %s (%s)\n', generators[type].title, type)];
  doc = doc.concat(_.flatten(Object.keys(exampleObject(type, 'storage')).map(function(field) {
    return sectionForField(field);
  })));
  doc = doc.concat(['client', 'ingestion', 'storage'].map(function(format) {
    return formatHeader(format) + '\n' + exampleJSON(type, format);
  }));
}

fs.writeFileSync(commander.path + type + '.md', doc.join('\n'));
