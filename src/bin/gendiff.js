#!/usr/bin/env node

import program from 'commander';

program
  .version('1.0.0')
  .description('cli program for compairing files')
  .option('-f, --format [type]', 'file format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
