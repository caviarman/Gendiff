
import fs from 'fs';
import getDiff from '../src';

const path = '__tests__/__fixtures__/';

describe('It works', () => {
  it('diff json', () => {
    const before = `${path}before.json`;
    const after = `${path}after.json`;
    expect(getDiff(before, after)).toEqual(fs.readFileSync(`${path}expected.txt`, 'utf-8'));
  });
  it('diff yaml', () => {
    const before = `${path}before.yaml`;
    const after = `${path}after.yaml`;
    expect(getDiff(before, after)).toEqual(fs.readFileSync(`${path}expected.txt`, 'utf-8'));
  });
  it('diff ini', () => {
    const before = `${path}before.ini`;
    const after = `${path}after.ini`;
    expect(getDiff(before, after)).toEqual(fs.readFileSync(`${path}expectedIni.txt`, 'utf-8'));
  });
  it('diff inner json', () => {
    const before = `${path}beforeInner.json`;
    const after = `${path}afterInner.json`;
    expect(getDiff(before, after)).toEqual(fs.readFileSync(`${path}expectedSimple.txt`, 'utf-8'));
  });
});

