import _ from 'lodash';

const indent = '    ';

const tab = num => indent.repeat(num);

const strignify = (value, level) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const arr = keys.map((item) => {
    if (!_.isObject(item)) {
      return `${tab(level + 1)}${item}: ${value[item]}`;
    }
    return `${tab(level + 1)}${item}: ${strignify(item, level + 1)}`;
  });
  return _.flattenDeep(['{', arr, `${tab(level)}  }`]).join('\n');
};

const render = (item) => {
  const {
    type, key, level, beforeValue, afterValue, children,
  } = item;
  const before = strignify(beforeValue, level);
  const after = strignify(afterValue, level);
  switch (type) {
    case 'nested':
      return [
        `${tab(level)}  ${key}: {`,
        children.map(node => render(node)),
        `${tab(level)}  }`,
      ];
    case 'unchanged':
      return `${tab(level)}  ${key}: ${before}`;
    case 'changed':
      return [
        `${tab(level)}- ${key}: ${before}`,
        `${tab(level)}+ ${key}: ${after}`,
      ];
    case 'deleted':
      return `${tab(level)}- ${key}: ${before}`;
    case 'added':
      return `${tab(level)}+ ${key}: ${after}`;
    default:
      throw new Error('Type error');
  }
};


export default tree => _.flattenDeep(tree.map(item => render(item))).join('\n');
