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

export const getAst = (firstPath, secondPath) => {
  const before = getObjFromFile(firstPath);
  const after = getObjFromFile(secondPath);
  const uniqKeys = _.union(Object.keys(before), Object.keys(after));
  const result = uniqKeys.reduce((acc, item) => [...acc, {
    name: item,
    before: before[item],
    after: after[item],
  }], []);
  return result;
};

export const getDiff = ast => ast.reduce((acc, item) => {
  const { name, before, after } = item;
  if (before === after) return acc.concat(`${name}: ${before}\n`);
  if (before && after) return acc.concat(`- ${name}: ${before}\n+ ${name}: ${after}\n`);
  if (before === undefined) return acc.concat(`+ ${name}: ${after}\n`);
  if (after === undefined) return acc.concat(`- ${name}: ${before}\n`);
  return acc;
}, '');

export const findDiff = (firstPath, secondPath) => {
  const ast = getAst(firstPath, secondPath);
  const diff = getDiff(ast);
  return diff;
};

