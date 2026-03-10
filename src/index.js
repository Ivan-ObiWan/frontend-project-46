import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const allKeys = new Set([...Object.keys(data1), ...Object.keys(data2)]);

  const sortedKeys = [...allKeys].sort();

  const lines = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!Object.hasOwn(data2, key)) {
      return `  - ${key}: ${value1}`;
    }

    if (!Object.hasOwn(data1, key)) {
      return `  + ${key}: ${value2}`;
    }

    if (value1 !== value2) {
      return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    }

    return `    ${key}: ${value1}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
