import fs from 'fs';
import _ from 'lodash';

const getObjFromJson = path => JSON.parse(fs.readFileSync(path, 'utf-8'));


export const getAst = (firstPath, secondPath) => {
  const before = getObjFromJson(firstPath);
  const after = getObjFromJson(secondPath);
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

