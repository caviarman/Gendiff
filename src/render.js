import _ from 'lodash';

const indent = '    ';

const tab = num => indent.repeat(num);

const strignify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  return keys.reduce((acc, item) => {
    if (!_.isObject(item)) {
      return acc.concat(`{\n${tab(depth + 1)}  ${item}: ${value[item]}\n${tab(depth)}}`);
    }
    return acc.concat(`{\n${tab(depth + 1)}  ${item}: ${strignify(item, depth + 1)}\n${tab(depth)}}`);
  }, '');
};

const render = ast => ast.reduce((acc, item) => {
  const depth = item.level;
  const before = strignify(item.beforeValue, depth);
  const after = strignify(item.afterValue, depth);
  switch (item.type) {
    case 'nested':
      return acc.concat(`\n${tab(depth)}  ${item.key}: {${render(item.children)}\n${tab(depth)}}`);
    case 'unchanged':
      return acc.concat(`\n${tab(depth)}  ${item.key}: ${before}`);
    case 'changed':
      return acc.concat(`\n${tab(depth)}- ${item.key}: ${before}\n${tab(depth)}+ ${item.key}: ${after}`);
    case 'deleted':
      return acc.concat(`\n${tab(depth)}- ${item.key}: ${before}`);
    case 'added':
      return acc.concat(`\n${tab(depth)}+ ${item.key}: ${after}`);
    default:
      return acc;
  }
}, '');

export default render;
