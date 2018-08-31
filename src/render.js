import _ from 'lodash';

const indent = '    ';

const tab = num => indent.repeat(num);

const strignify = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    return keys.reduce((acc, item) => acc.concat(`{\n${tab(depth + 1)}  ${item}: ${value[item]}\n${tab(depth)}}`), '');
  }
  return value;
};

const render = ast => ast.reduce((acc, item) => {
  const depth = item.level;
  const before = strignify(item.beforeValue, depth);
  const after = strignify(item.afterValue, depth);
  if (item.type === 'nested') {
    return acc.concat(`\n${tab(depth)}  ${item.key}: {${render(item.children)}\n${tab(depth)}}`);
  }
  if (item.type === 'unchanged') {
    return acc.concat(`\n${tab(depth)}  ${item.key}: ${before}`);
  }
  if (item.type === 'changed') {
    return acc.concat(`\n${tab(depth)}- ${item.key}: ${before}\n${tab(depth)}+ ${item.key}: ${after}`);
  }
  if (item.type === 'deleted') {
    return acc.concat(`\n${tab(depth)}- ${item.key}: ${before}`);
  }
  if (item.type === 'added') {
    return acc.concat(`\n${tab(depth)}+ ${item.key}: ${after}`);
  }
  return acc;
}, '');

export default render;
