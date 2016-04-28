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

/**
 * Description
 * @method getIntroSectionRegExp
 * @param {String} title the title of the data type introduction
 * @return string for input to RegExp constructor to match a title on a data type's intro in existing input doc
 */
function getIntroSectionRegExp(title) {
  return '##\\s' + title + '\\s+?[\\w\\W\\s]+?<!--\\send\\sintro\\s-->\\n';
}

/**
 * Description
 * @method addIntroTodoToIndexDoc
 * @param {Array} indexDoc the array of Markdown strings representing the index document for a type with sub-types
 * @return N/A mutates array
 */
function addIntroTodoToIndexDoc(indexDoc) {
  indexDoc.push('<!-- TODO -->');
  indexDoc.push('<!-- end intro -->\n');
}

/**
 * Description
 * @method addLinksToIndexDoc
 * @param {Array} indexDoc the array of Markdown strings representing the index document for a type with sub-types
 * @return N/A mutates array
 */
function addLinksToIndexDoc(indexDoc) {
  generators[type].subTypes.map(function(subType) {
    indexDoc.push(util.format('- [%s](./%s.md)', subType, subType))
  });
}

/**
 * Description
 * @method getDocPath
 * @param {String} base path to base directory for generated Markdown docs
 * @return constructed deep path to location in base for doc being generated or updated
 */
function getDocPath(base) {
  if (type === 'common') {
    return base + type + '.md';
  }
  if (hasSubtypes) {
    var indexDoc = [util.format('## %s\n', generators[type].title)];
    var existingReadme = '';
    try {
      existingReadme = fs.readFileSync(base + 'types/' + type + '/README.md', 'utf8');
      var existingIntro = existingReadme.match(
        new RegExp(getIntroSectionRegExp(generators[type].title))
      );
      if (existingIntro && existingReadme.search('TODO') === -1) {
        indexDoc = [existingIntro];
        addLinksToIndexDoc(indexDoc);
      }
      else {
        addIntroTodoToIndexDoc(indexDoc);
        addLinksToIndexDoc(indexDoc);
      }
      fs.writeFileSync(base + 'types/' + type + '/README.md', indexDoc.join('\n') + '\n');
    }
    catch(e) {
      if (e.message.search('ENOENT') !== -1) {
        addIntroTodoToIndexDoc(indexDoc);
        addLinksToIndexDoc(indexDoc);
        fs.mkdirSync(base + 'types/' + type);
        fs.writeFileSync(base + 'types/' + type + '/README.md', indexDoc.join('\n') + '\n');
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

/**
 * Description
 * @method formatHeader
 * @param {String} format one of { ingestion | storage | client }
 * @return Markdown string for an example header
 */
function formatHeader(format) {
  return util.format('### example (%s)\n', format.toLowerCase());
}

/**
 * Description
 * @method exampleObject
 * @param {String} type the data type
 * @param {String} format one of { ingestion | storage | client }; OPTIONAL, defaults to `storage`
 * @return sample datum, NOT YET stringified to JSON
 */
function exampleObject(type, format) {
  format = format || 'storage';
  if (hasSubtypes) {
    return generators[type].generator({
      format: format,
      subType: commander.subType,
      timestamp: new Date().toISOString()
    });
  }
  return generators[type].generator(new Date().toISOString(), format);
}

/**
 * Description
 * @method exampleJSON
 * @param {String} type the data type
 * @param {String} format one of { ingestion | storage | client }
 * @return Markdown string for a JSON code block containing sample datum
 */
function exampleJSON(type, format) {
  return '```json\n' + JSON.stringify(
    exampleObject(type, format),
    null,
    '\t'
  ) + '\n```\n';
}

/**
 * Description
 * @method fieldSectionHeader
 * @param {String} field the name of a field existing on a data type
 * @return Markdown string for a section header for a field in a data type
 */
function fieldSectionHeader(field) {
  return util.format('### %s\n', field);
}

/**
 * Description
 * @method commonSectionForField
 * @param {String} field the name of a common field
 * @return Markdown string containing boilerplate section (header and contents) for a common field
 */
function commonSectionForField(field) {
  var fieldSection = [fieldSectionHeader(field)];
  fieldSection.push('<!-- TODO -->');
  fieldSection.push(util.format('<!-- end %s -->\n', field));
  return fieldSection;
}

/**
 * Description
 * @method sectionForField
 * @param {String} field the name of a field existing on a data type
 * @param {String} summary Markdown string boilerplate giving a summary for the field
 * @param {Array} changeLog array of strings, each describing a change on the field's contents or validation
 * @return Markdown string containing boilerplate section (header and contents) for a field in a data type or subType
 */
function sectionForField(field, summary, changeLog) {
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
    if (summary) {
      _.forOwn(summary, function(section, sectionKey) {
        var isObj = typeof section === 'object';
        if (isObj) {
          switch (sectionKey) {
            case 'required':
              // the QUICK SUMMARY indicator goes here because `required` is always first
              fieldSection.push('\tQUICK SUMMARY');
              fieldSection.push('\tRequired:');
              fieldSection.push(Object.keys(section).map(function(api) {
                return util.format('\t\t%s: ' + (section[api] ? 'yes' : ((section[api] === null) ? 'nonexistent' : 'no (optional)')), api);
              }).join('\n'));
              break;
            case 'range':
              fieldSection.push('\tRange:');
              fieldSection.push(Object.keys(section).map(function(bound) {
                return util.format('\t\t%s: %s', bound, section[bound]);
              }).join('\n'));
              break;
            default:
              fieldSection.push('');
          }
        }
        else {
          var prefix, postfix;
          switch (sectionKey) {
            case 'numericalType':
              prefix = '\tType: ';
              postfix = '';
              break;
            default:
              prefix = '';
              postfix = '\n';
          }
          var isFn = typeof section === 'function';
          fieldSection.push(prefix + (isFn ? section() : section) + postfix);
        }
      });
    }
    if (changeLog) {
      fieldSection.push(util.format('#### Changelog for `%s`\n', field));
      _.each(changeLog, function(logItem) {
        fieldSection.push(logItem + '\n');
      });
    }
  }
  return fieldSection;
}

/**
 * Description
 * @method getFieldSectionRegExp
 * @param {String} field the name of a field existing on a data type
 * @return string for input to RegExp constructor to match a field on a data type's section header in existing input doc
 */
function getFieldSectionRegExp(field) {
  return '<!--\\sstart\\s' + field + '\\s-->\\s+?[\\w\\W\\s]+?<!--\\send\\s' + field + '\\s-->\\n';
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
  var schemaFields = hasSubtypes ? generators[type].summary[commander.subType] : generators[type].summary;
  var allFields = Object.keys(_.merge(
    _.cloneDeep(schemaFields),
    exampleObject(type, 'ingestion'),
    exampleObject(type, 'storage')
  ));
  doc = doc.concat(_.flatten(allFields.map(function(field) {
    var existingSection = existing.match(
      new RegExp(getFieldSectionRegExp(field))
    );
    var sectionBase = hasSubtypes ?
      sectionForField(field, generators[type].summary[commander.subType][field], generators[type].changeLog[commander.subType][field]) :
      sectionForField(field, generators[type].summary[field], generators[type].changeLog[field]);
    if (existingSection && (existingSection[0].search('TODO') === -1)) {
      sectionBase.push(existingSection[0]);
      sectionBase.push('* * * * *\n');
      return sectionBase;
    }
    sectionBase.push(util.format('<!-- start %s -->', field));
    sectionBase.push('<!-- TODO -->');
    sectionBase.push(util.format('<!-- end %s -->\n', field));
    sectionBase.push('* * * * *\n');
    return sectionBase;
  })));
  doc = doc.concat(['client', 'ingestion', 'storage'].map(function(format) {
    var header = formatHeader(format) + '\n';
    return header + exampleJSON(type, format);
  }));
}

fs.writeFileSync(docPath, doc.join('\n'));
