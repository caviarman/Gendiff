import _ from 'lodash';

const isComplex = value => (_.isObject(value) ? '[complex value]' : value);

const renderPlain = ast => ast.reduce((acc, item) => {
  const {
    type, key, path, beforeValue, afterValue, children,
  } = item;
  const before = isComplex(beforeValue);
  const after = isComplex(afterValue);
  switch (type) {
    case 'nested':
      return acc.concat(`${renderPlain(children)}`);
    case 'changed':
      return acc.concat(`\nProperty '${path}${key}' was updated. From '${before}' to '${after}'`);
    case 'deleted':
      return acc.concat(`\nProperty '${path}${key}' was removed`);
    case 'added':
      return acc.concat(`\nProperty '${path}${key}' was added with value: '${after}'`);
    default:
      return acc;
  }
}, '');

export default renderPlain;
