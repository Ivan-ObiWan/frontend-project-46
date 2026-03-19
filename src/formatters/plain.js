import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (diff, path = '') => {
  const lines = diff.flatMap((item) => {
    const propertyPath = path ? `${path}.${item.key}` : item.key;

    switch (item.type) {
      case 'nested':
        return plain(item.children, propertyPath);

      case 'added':
        return `Property '${propertyPath}' was added with value: ${stringify(item.value)}`;

      case 'removed':
        return `Property '${propertyPath}' was removed`;

      case 'changed':
        return `Property '${propertyPath}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;

      case 'unchanged':
        return [];

      default:
        return [];
    }
  });

  return lines.join('\n');
};

export default plain;
