import _ from 'lodash';
import parseFile from './parsers.js';

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: value1 };
    }
    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 };
    }
    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    };
  });
  return diff;
};

const formatDiff = (diff) => {
  const lines = diff.flatMap((item) => {
    switch (item.type) {
      case 'added':
        return [`  + ${item.key}: ${item.value}`];
      case 'removed':
        return [`  - ${item.key}: ${item.value}`];
      case 'unchanged':
        return [`    ${item.key}: ${item.value}`];
      case 'changed':
        return [
          `  - ${item.key}: ${item.oldValue}`,
          `  + ${item.key}: ${item.newValue}`,
        ];
      default:
        return [];
    }
  });
  return `{\n${lines.join('\n')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  return formatDiff(diff);
};

export default genDiff;
