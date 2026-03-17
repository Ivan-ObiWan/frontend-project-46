import _ from 'lodash';
import parseFile from './parsers.js';

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2)
      };
    }

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 };
    }
    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 };
    }
    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2
    };
  });
};

const stylish = (diff, depth = 1) => {
  const indentSize = depth * 4;
  const signIndent = ' '.repeat(indentSize - 2);
  const plainIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize);
  
  const lines = diff.flatMap((item) => {
    switch (item.type) {
      case 'nested':
        return `${plainIndent}${item.key}: {\n${stylish(item.children, depth + 1)}\n${plainIndent}}`;
      
      case 'added':
        return `${signIndent}+ ${item.key}: ${formatValue(item.value, depth + 1)}`;
      
      case 'removed':
        return `${signIndent}- ${item.key}: ${formatValue(item.value, depth + 1)}`;
      
      case 'unchanged':
        return `${plainIndent}${item.key}: ${formatValue(item.value, depth + 1)}`;
      
      case 'changed':
        return [
          `${signIndent}- ${item.key}: ${formatValue(item.oldValue, depth + 1)}`,
          `${signIndent}+ ${item.key}: ${formatValue(item.newValue, depth + 1)}`
        ];
      
      default:
        return [];
    }
  });
  
  return lines.join('\n');
};

const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  
  const indentSize = depth * 4;
  const indent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - 4);
  
  const entries = Object.entries(value).map(([key, val]) => {
    return `${indent}${key}: ${formatValue(val, depth + 1)}`;
  });
  
  return `{\n${entries.join('\n')}\n${bracketIndent}}`;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  
  if (format === 'stylish') {
    return `{\n${stylish(diff, 1)}\n}`;
  }
  
  throw new Error(`Unknown format: ${format}`);
};

export default genDiff;
