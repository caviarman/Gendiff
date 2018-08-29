import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsing';

const render = (before, after) => {
  const unionKeys = _.union(Object.keys(before), Object.keys(after));
  return unionKeys.reduce((acc, item) => {
    if ((_.has(before, item) && _.has(after, item)) && before[item] === after[item]) return acc.concat(`${item}: ${before[item]}\n`);
    if ((_.has(before, item) && _.has(after, item)) && before[item] !== after[item]) return acc.concat(`- ${item}: ${before[item]}\n+ ${item}: ${after[item]}\n`);
    if (_.has(before, item) && !(_.has(after, item))) return acc.concat(`- ${item}: ${before[item]}\n`);
    if (!(_.has(before, item) && _.has(after, item))) return acc.concat(`+ ${item}: ${after[item]}\n`);
    return acc;
  }, '');
};

export default (firstPath, secondPath) => {
  const beforeExtention = path.extname(firstPath);
  const afterExtension = path.extname(secondPath);
  const beforeStr = fs.readFileSync(firstPath, 'utf-8');
  const afterStr = fs.readFileSync(secondPath, 'utf-8');
  const before = parse(beforeStr, beforeExtention);
  const after = parse(afterStr, afterExtension);
  return render(before, after);
};

