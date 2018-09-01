import _ from 'lodash';

const checkComplex = value => (_.isObject(value) ? '[complex value]' : value);

const render = (ast, path = '') => {
  const result = ast.filter(item => item.type !== 'unchanged')
    .map((item) => {
      const {
        key, type, children, beforeValue, afterValue,
      } = item;

      const before = checkComplex(beforeValue);
      const after = checkComplex(afterValue);
      const name = `${path}${key}`;
      const nameForChildren = `${path}${key}.`;

      switch (type) {
        case 'nested':
          return render(children, nameForChildren);
        case 'added':
          return `Property '${name}' was added with value: ${after}`;
        case 'changed':
          return `Property '${name}' was updated. From ${before} to ${after}`;
        case 'deleted':
          return `Property '${name}' was removed`;
        default:
          throw new Error('Undefined node type');
      }
    });
  return _.flattenDeep(result).join('\n');
};

export default render;
