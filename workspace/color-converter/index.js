#!/usr/bin/env node
const program = require('commander');
const converter = require('./converter');

program
  .version('1.0.0')
  .description('Color Converter');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

const inputColor = process.argv[2];
const toFormat = process.argv[4];
const operation = process.argv[4];
const value = process.argv[5];

if (toFormat) {
  console.log(`Input: ${inputColor}
Output: ${converter[inputColor] --to ${toFormat}}`);
} else if (operation) {
  console.log(`Input: ${inputColor}
Output: ${converter[inputColor] --${operation} ${value}}`);
}