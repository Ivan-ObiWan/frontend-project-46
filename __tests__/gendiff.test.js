import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

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
  
  expect(lines[1]).toMatch(/follow/);
  expect(lines[2]).toMatch(/host/);
  expect(lines[3]).toMatch(/proxy/);
  expect(lines[4]).toMatch(/timeout/);
});
