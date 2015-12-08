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
  .option('-p, --path <value>', 'path to docs directory', '../platform/')
  .parse(process.argv);

if (_.isEmpty(commander.args)) {
  console.log();
  console.error(chalk.bold.red('You must provide a Tidepool platform data type as the last command-line argument!'));
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
console.log(chalk.bold.cyan('~#*~#* TIDEPOOL PLATFORM DATA MODEL DOC TEMPLATE GENERATOR *#~*#~'));
console.log();
console.log(chalk.gray('Type:'), type);
console.log();

var docPath = commander.path + 'types/' + type + '.md';

var existing = '';
try {
  existing = fs.readFileSync(docPath, 'utf8');
}
catch(err) {
  console.warn(err.message);
  console.log();
  console.log('Creating new document instead...');
  console.log();
}

function formatHeader(format) {
  return util.format('### example (%s)\n', format);
}

function exampleObject(type, opts) {
  return generators[type].generator(opts);
}

function exampleJSON(type, opts) {
  return '```json\n' + JSON.stringify(
    generators[type].generator(opts),
    null,
    '\t'
  ) + '\n```\n';
}

function fieldSectionHeader(field) {
  return util.format('### %s\n', field);
}

function commonSectionForField(field) {
  var fieldSection = [fieldSectionHeader(field)];
  fieldSection.push('<!-- TODO -->');
  fieldSection.push(util.format('<!-- end %s -->\n', field));
  return fieldSection;
}

function sectionForField(field, propType) {
  var fieldSection = [fieldSectionHeader(field)];
  if (propType) {
    fieldSection.push(propType + '\n');
  }
  fieldSection.push('<!-- TODO -->');
  fieldSection.push(util.format('<!-- end %s -->\n', field));
  return fieldSection;
}

function getFieldSectionRegExp(field) {
  return '###\\s' + field + '\\s+?[\\w\\W\\s]+?<!--\\send\\s' + field + '\\s-->\\n';
}

var doc = [util.format('## %s (%s)\n', generators[type].title, type)];
doc.push('**NB:** All fields are *required* unless otherwise noted.\n');
var exObj = exampleObject(type, {subType: 'patient'});
var fieldsToDocument = _.flatten(Object.keys(exObj).map(function(field) {
  if (typeof exObj[field] === 'object' && !Array.isArray(exObj[field])) {
    var fields = [field];
    Object.keys(exObj[field]).forEach(function(innerField) {
      fields.push(innerField);
    });
    return fields;
  }
  return field;
}));
doc = doc.concat(_.flatten(fieldsToDocument.map(function(field) {
  var existingSection = existing.match(
    new RegExp(getFieldSectionRegExp(field))
  );
  if (existingSection && (existingSection[0].search('TODO') === -1)) {
    return existingSection[0];
  }
  return sectionForField(field, generators[type].propTypes[field]);
})));
doc = doc.concat(['non-PWD', 'PWD'].map(function(format) {
  var header = formatHeader(format) + '\n';
  var existingExample = existing.match(
    new RegExp('###\\s+example\\s+\\(' + format + '\\)\\s+?```json[\\w\\W\\s]+?```\\n')
  );
  if (existingExample) {
    return existingExample[0];
  }
  return header + exampleJSON(type, {subType: (format === 'PWD') ? 'patient' : ''});
}));

fs.writeFileSync(docPath, doc.join('\n'));
