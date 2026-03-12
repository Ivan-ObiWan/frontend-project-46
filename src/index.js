import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);

  const lines = sortedKeys.flatMap((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    const hasIn1 = _.has(data1, key);
    const hasIn2 = _.has(data2, key);

    if (hasIn1 && hasIn2) {
      if (_.isEqual(value1, value2)) {
        return `    ${key}: ${value1}`;
      }
        return [
        `  - ${key}: ${value1}`,
        `  + ${key}: ${value2}`
      ];
    }

    if (hasIn1 && !hasIn2) {
      return `  - ${key}: ${value1}`;
    }

    if (!hasIn1 && hasIn2) {
      return `  + ${key}: ${value2}`;
    }
  });

  return `{\n${lines.flat().join('\n')}\n}`;
};

export default genDiff;
