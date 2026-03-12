import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff.jsonfile', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFile('expected.txt').trim();

  const result = genDiff(filepath1, filepath2);

  console.log('LENGTH:', result.length, expected.length);
  console.log('RESULT:', JSON.stringify(result));
  console.log('EXPECTED:', JSON.stringify(expected));
  console.log('FIRST DIFF:', result.charCodeAt(0), expected.charCodeAt(0));

  expect(result).toBe(expected);
});

test('gendiff.absolutepaths', () => {
  const filepath1 = path.resolve(getFixturePath('file1.json'));
  const filepath2 = path.resolve(getFixturePath('file2.json'));
  const expected = readFile('expected.txt').trim();

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
