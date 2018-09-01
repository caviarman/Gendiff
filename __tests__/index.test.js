
import fs from 'fs';
import getDiff from '../src';

const path = '__tests__/__fixtures__/';

describe('It works', () => {
  it('json', () => {
    const before = `${path}before.json`;
    const after = `${path}after.json`;
    expect(getDiff(before, after)).toEqual(fs.readFileSync(`${path}expected.txt`, 'utf-8'));
  });
  it('yaml', () => {
    const before = `${path}before.yaml`;
    const after = `${path}after.yaml`;
    expect(getDiff(before, after)).toEqual(fs.readFileSync(`${path}expected.txt`, 'utf-8'));
  });
  it('ini', () => {
    const before = `${path}before.ini`;
    const after = `${path}after.ini`;
    expect(getDiff(before, after)).toEqual(fs.readFileSync(`${path}expectedIni.txt`, 'utf-8'));
  });
  it('json tree', () => {
    const before = `${path}beforeInner.json`;
    const after = `${path}afterInner.json`;
    expect(getDiff(before, after)).toEqual(fs.readFileSync(`${path}expectedInner.txt`, 'utf-8'));
  });
  it('plain', () => {
    const before = `${path}beforeInner.json`;
    const after = `${path}afterInner.json`;
    expect(getDiff(before, after, 'plain')).toEqual(fs.readFileSync(`${path}expectedPlain.txt`, 'utf-8'));
  });
});

