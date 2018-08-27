import fs from 'fs';
import getObjFromJson from '../src' 

describe('It works', () => {
  it('function getObjFromJson', () => {
    const json = fs.readFileSync('__tests__/__fixtures__/file.test1.json', 'utf-8');
  expect(getObjFromJson(json)).toEqual({ 'a': 10, 'b': 'test' });
  });
});
