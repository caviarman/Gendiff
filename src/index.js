import fs from 'fs';
import _ from 'lodash';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const getStrFromFile = file => fs.readFileSync(file, 'utf-8');
const getExtension = file => path.extname(file);
const parsers = {
  '.json': file => JSON.parse(file),
  '.yaml': file => yaml.safeLoad(file),
  '.ini': file => ini.parse(file),
};
const parse = (str, extention) => parsers[extention](str);

export const getObjFromFile = (file) => {
  const str = getStrFromFile(file);
  const extention = getExtension(file);
  return parse(str, extention);
};

export const Diff = (before, after) => {
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
  const before = getObjFromFile(firstPath);
  const after = getObjFromFile(secondPath);
  const diff = Diff(before, after);
  return diff;
};

