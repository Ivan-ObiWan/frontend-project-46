import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('gendiff json files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFile('expected.txt');

  const result = genDiff(filepath1, filepath2);

  expect(result).toBe(expected);
});

test('gendiff with absolute paths', () => {
  const filepath1 = path.resolve(getFixturePath('file1.json'));
  const filepath2 = path.resolve(getFixturePath('file2.json'));
  const expected = readFile('expected.txt');

  const result = genDiff(filepath1, filepath2);

  expect(result).toBe(expected);
});

test('gendiff sorts keys alphabetically', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const result = genDiff(filepath1, filepath2);
  const lines = result.split('\n');

  const followLine = lines.find(line => line.includes('follow'));
  const hostLine = lines.find(line => line.includes('host'));
  const proxyLine = lines.find(line => line.includes('proxy'));
  const timeoutLine = lines.find(line => line.includes('timeout'));

  expect(lines.indexOf(followLine)).toBeLessThan(lines.indexOf(hostLine));
  expect(lines.indexOf(hostLine)).toBeLessThan(lines.indexOf(proxyLine));
  expect(lines.indexOf(proxyLine)).toBeLessThan(lines.indexOf(timeoutLine));
});

test('gendiff compares yaml files correctly', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const expected = readFile('expected.txt');
  const result = genDiff(filepath1, filepath2);

  expect(result).toBe(expected);
});

test('gendiff compares yaml files with absolute paths', () => {
  const filepath1 = path.resolve(getFixturePath('file1.yml'));
  const filepath2 = path.resolve(getFixturePath('file2.yml'));
  const expected = readFile('expected.txt');

  const result = genDiff(filepath1, filepath2);

  expect(result).toBe(expected);
});

test('gendiff works with mixed formats', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  const expected = readFile('expected.txt');

  const result = genDiff(filepath1, filepath2);

  expect(result).toBe(expected);
});
test('gendiff nested json files', () => {
  const filepath1 = getFixturePath('file1-nested.json');
  const filepath2 = getFixturePath('file2-nested.json');
  const expected = readFile('expected-nested.txt');

  const result = genDiff(filepath1, filepath2);
  expect(result).toBe(expected);
});

test('gendiff nested yaml files', () => {
  const filepath1 = getFixturePath('file1-nested.yml');
  const filepath2 = getFixturePath('file2-nested.yml');
  const expected = readFile('expected-nested.txt');

  const result = genDiff(filepath1, filepath2);
  expect(result).toBe(expected);
});

test('gendiff plain format', () => {
  const filepath1 = getFixturePath('file1-nested.json');
  const filepath2 = getFixturePath('file2-nested.json');
  const expected = readFile('expected-plain.txt');

  const result = genDiff(filepath1, filepath2, 'plain');
  expect(result).toBe(expected);
});

test('gendiff plain format with yaml', () => {
  const filepath1 = getFixturePath('file1-nested.yml');
  const filepath2 = getFixturePath('file2-nested.yml');
  const expected = readFile('expected-plain.txt');

  const result = genDiff(filepath1, filepath2, 'plain');
  expect(result).toBe(expected);
});
