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

var type, hasSubtypes = false;

commander.usage('[options] <type>')
  .option('-p, --path <value>', 'path to docs directory', '../device-data/')
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
  subTypes = generators[type].subTypes;
  hasSubtypes = Array.isArray(subTypes) && !_.isEmpty(subTypes);
  if (!generators[type] || typeof generators[type].generator !== 'function') {
    console.log();
    console.error(chalk.bold.red('Sorry, no generator defined yet for %s :('), type);
    console.log();
    process.exit();
  }
  if (!commander.subType && hasSubtypes) {
    console.log();
    console.error(
      chalk.bold.red('Sorry, %s requires a subType from: %s :('),
      type,
      generators[type].subTypes.join(', ')
    );
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

function getDocPath(base) {
  if (type === 'common') {
    return base + type + '.md';
  }
  if (hasSubtypes) {
    var indexDoc = [util.format('## %s\n', generators[type].title)];
    generators[type].subTypes.map(function(subType) {
      indexDoc.push(util.format('- [%s](./%s.md)', subType, subType))
    });
    try {
      fs.writeFileSync(base + 'types/' + type + '/README.md', indexDoc.join('\n'));
    }
    catch(e) {
      if (e.message.search('ENOENT') !== -1) {
        fs.mkdirSync(base + 'types/' + type);
        fs.writeFileSync(base + 'types/' + type + '/README.md', indexDoc.join('\n'));
      }
      else {
        console.error(e);
        process.exit();
      }
    }
    
    return base + 'types/' + type + '/' + commander.subType + '.md';
  }
  else {
    return base + 'types/' + type + '.md';
  }
}

var docPath = getDocPath(commander.path);

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
  return util.format('### example (%s)\n', format.toLowerCase());
}

function exampleObject(type, format) {
  format = format || 'storage';
  if (hasSubtypes) {
    return generators[type].generator({
      format: format,
      subType: commander.subType,
      timestamp: new Date().toISOString()
    });
  }
  return generators[type].generator(new Date().toISOString(), 'storage');
}

function exampleJSON(type, format) {
  return '```json\n' + JSON.stringify(
    exampleObject(type),
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
  if (commonFields[field] !== undefined) {
    if (hasSubtypes) {
      fieldSection.push('See [common fields](../../common.md).\n');
    }
    else {
      fieldSection.push('See [common fields](../common.md).\n');
    }
  }
  else {
    if (propType) {
      fieldSection.push(propType + '\n');
    }
    fieldSection.push('<!-- TODO -->');
    fieldSection.push(util.format('<!-- end %s -->\n', field));
  }
  return fieldSection;
}

function getFieldSectionRegExp(field) {
  return '###\\s' + field + '\\s+?[\\w\\W\\s]+?<!--\\send\\s' + field + '\\s-->\\n';
}

if (type === 'common') {
  var doc = [util.format('## %s\n', generators[type].title)];
  doc.push('Jump to...\n');
  doc = doc.concat(Object.keys(commonFields).map(function(field) {
    return util.format('  - [%s](#%s)', field, field.toLowerCase());
  }));
  doc.push('\n**NB:** All fields are *required* unless otherwise noted.\n');
  doc = doc.concat(_.flatten(Object.keys(commonFields).map(function(field) {
    var existingSection = existing.match(
      new RegExp(getFieldSectionRegExp(field))
    );
    if (existingSection && (existing[0].search('TODO') === -1)) {
      return existingSection[0];
    }
    return commonSectionForField(field);
  })));
  var exampleHeader = '### example (all possible fields)\n\n';
  var existingExample = existing.match(
    /###\s+example\s+\(all\spossible\sfields\)\s+?```json[\w\W\s]+?```\n/
  );
  if (existingExample) {
    doc = doc.concat(existingExample[0]);
  }
  else {
    doc = doc.concat([exampleHeader + exampleJSON(type, 'storage')]);
  }
}
else {
  var doc;
  if (hasSubtypes) {
    doc = [util.format('## %s: `%s`\n', generators[type].subtitle, commander.subType)];
  }
  else {
    doc = [util.format('## %s (%s)\n', generators[type].title, type)];
  }
  doc.push('**NB:** All fields are *required* unless otherwise noted.\n');
  doc.push('\n> Jump to example JSON:\n');
  ['client', 'ingestion', 'storage'].map(function(exampleType) {
    doc.push(util.format('>  - [%s example](#example-%s)', exampleType, exampleType));
  })
  doc.push('\n');
  var allFields = Object.keys(_.merge(
    exampleObject(type, 'storage'),
    exampleObject(type, 'ingestion')
  ));
  doc = doc.concat(_.flatten(allFields.map(function(field) {
    var existingSection = existing.match(
      new RegExp(getFieldSectionRegExp(field))
    );
    if (existingSection && (existingSection[0].search('TODO') === -1)) {
      return existingSection[0];
    }
    return hasSubtypes ? sectionForField(field, generators[type].propTypes[commander.subType][field]) :
      sectionForField(field, generators[type].propTypes[field]);
  })));
  doc = doc.concat(['client', 'ingestion', 'storage'].map(function(format) {
    var header = formatHeader(format) + '\n';
    var existingExample = existing.match(
      new RegExp('###\\s+example\\s+\\(' + format + '\\)\\s+?```json[\\w\\W\\s]+?```\\n')
    );
    if (existingExample) {
      return existingExample[0];
    }
    return header + exampleJSON(type, format);
  }));
}

fs.writeFileSync(docPath, doc.join('\n'));
