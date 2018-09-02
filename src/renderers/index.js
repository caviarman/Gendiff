import common from './rendererDiff';
import plain from './rendererPlain';
import json from './rendererJson';

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
