import ini from 'ini';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};
export default (str, extention) => parsers[extention](str);
