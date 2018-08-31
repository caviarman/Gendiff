import _ from 'lodash';

const buildAst = (before, after, depth = 0) => {
  const keys = _.union(Object.keys(before), Object.keys(after));
  return keys.reduce((acc, item) => {
    if ((_.has(before, item) && _.has(after, item))
     && before[item] instanceof Object && after[item] instanceof Object) {
      return acc.concat({
        type: 'nested',
        key: item,
        level: depth,
        children: buildAst(before[item], after[item], depth + 1),
      });
    }
    if ((_.has(before, item) && _.has(after, item)) && before[item] === after[item]) {
      return acc.concat({
        type: 'unchanged',
        key: item,
        beforeValue: before[item],
        afterValue: after[item],
        level: depth,
      });
    }
    if ((_.has(before, item) && _.has(after, item)) && before[item] !== after[item]) {
      return acc.concat({
        type: 'changed',
        key: item,
        beforeValue: before[item],
        afterValue: after[item],
        level: depth,
      });
    }
    if (_.has(before, item) && !_.has(after, item)) {
      return acc.concat({
        type: 'deleted',
        key: item,
        beforeValue: before[item],
        afterValue: null,
        level: depth,
      });
    }
    if (!_.has(before, item) && _.has(after, item)) {
      return acc.concat({
        type: 'added',
        key: item,
        beforeValue: null,
        afterValue: after[item],
        level: depth,
      });
    }
    return acc;
  }, []);
};

export default buildAst;
