import _ from 'lodash';
import parse from './parsing';

const render = (before, after) => {
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
  const before = parse(firstPath);
  const after = parse(secondPath);
  return render(before, after);
};

