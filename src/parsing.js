import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const getStrFromFile = file => fs.readFileSync(file, 'utf-8');
const getExtension = file => path.extname(file);
const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};
const parse = (str, extention) => parsers[extention](str);

export default (file) => {
  const str = getStrFromFile(file);
  const extention = getExtension(file);
  return parse(str, extention);
};

