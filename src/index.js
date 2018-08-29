import fs from 'fs';
import _ from 'lodash';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const getObjFromJson = file => JSON.parse(fs.readFileSync(file, 'utf-8'));
const getObjFromYaml = file => yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
const getObjFromIni = file => ini.parse(fs.readFileSync(file, 'utf-8'));
const getExtension = file => path.extname(file);
const extensions = {
  '.json': file => getObjFromJson(file),
  '.yaml': file => getObjFromYaml(file),
  '.ini': file => getObjFromIni(file),
};
const getObjFromFile = (file) => {
  const extention = getExtension(file);
  const parse = extensions[extention];
  return parse(file);
};
const Diff = (before, after) => {
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

