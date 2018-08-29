import fs from 'fs';
import { Diff, getObjFromFile } from '../src';

describe('It works', () => {
  it('diff json', () => {
    const first = getObjFromFile('__tests__/__fixtures__/first.json');
    const second = getObjFromFile('__tests__/__fixtures__/second.json');
    expect(Diff(first, second)).toEqual(fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8'));
  });
  it('diff yaml', () => {
    const first = getObjFromFile('__tests__/__fixtures__/first.yaml');
    const second = getObjFromFile('__tests__/__fixtures__/second.yaml');
    expect(Diff(first, second)).toEqual(fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8'));
  });
  it('diff json vs yaml', () => {
    const first = getObjFromFile('__tests__/__fixtures__/first.json');
    const second = getObjFromFile('__tests__/__fixtures__/second.yaml');
    expect(Diff(first, second)).toEqual(fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8'));
  });
  it('diff ini', () => {
    const first = getObjFromFile('__tests__/__fixtures__/first.ini');
    const second = getObjFromFile('__tests__/__fixtures__/second.ini');
    expect(Diff(first, second)).toEqual(fs.readFileSync('__tests__/__fixtures__/expectedIni.txt', 'utf-8'));
  });
});

