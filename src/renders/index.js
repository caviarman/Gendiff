import common from './renderCommon';
import plain from './renderPlain';
import json from './renderJson';

export default (ast, format) => {
  switch (format) {
    case 'plain':
      return plain(ast);
    case 'json':
      return json(ast, null, 2);
    default:
      return common(ast);
  }
};
