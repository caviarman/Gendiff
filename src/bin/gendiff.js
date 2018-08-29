#!/usr/bin/env node

import program from 'commander';
import { getObjFromFile, Diff } from '..';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const before = getObjFromFile(firstConfig);
    const after = getObjFromFile(secondConfig);
    const result = Diff(before, after);
    console.log(result);
  })
  .parse(process.argv);
