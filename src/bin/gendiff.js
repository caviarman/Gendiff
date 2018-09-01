#!/usr/bin/env node

import program from 'commander';
import getDiff from '..';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(getDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
