import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);

  const lines = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data2, key)) {
      return `  - ${key}: ${value1}`;
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${value2}`;
    }
    if (!_.isEqual(value1, value2)) {
      return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    }
    return `    ${key}: ${value1}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
