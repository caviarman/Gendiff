import commonRender from './renderCommon';
import plainRender from './renderPlain';

export default (ast, format) => {
  switch (format) {
    case 'plain':
      return plainRender(ast);
    default:
      return commonRender(ast);
  }
};
