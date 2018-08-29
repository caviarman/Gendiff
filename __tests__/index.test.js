
import fs from 'fs';
import getDiff from '../src';

describe('It works', () => {
  it('diff json', () => {
    const first = '__tests__/__fixtures__/first.json';
    const second = '__tests__/__fixtures__/second.json';
    expect(getDiff(first, second)).toEqual(fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8'));
  });
  it('diff yaml', () => {
    const first = '__tests__/__fixtures__/first.yaml';
    const second = '__tests__/__fixtures__/second.yaml';
    expect(getDiff(first, second)).toEqual(fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8'));
  });
  it('diff json vs yaml', () => {
    const first = '__tests__/__fixtures__/first.json';
    const second = '__tests__/__fixtures__/second.yaml';
    expect(getDiff(first, second)).toEqual(fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8'));
  });
  it('diff ini', () => {
    const first = '__tests__/__fixtures__/first.ini';
    const second = '__tests__/__fixtures__/second.ini';
    expect(getDiff(first, second)).toEqual(fs.readFileSync('__tests__/__fixtures__/expectedIni.txt', 'utf-8'));
  });
});

