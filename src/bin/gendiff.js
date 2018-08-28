#!/usr/bin/env node

import program from 'commander';
import { findDiff } from '..';

program
  .version('1.0.4')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = findDiff(firstConfig, secondConfig);
    console.log(result);
  })
  .parse(process.argv);
