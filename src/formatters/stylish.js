import _ from 'lodash'

const stylish = (diff, depth = 1) => {
  const indentSize = depth * 4
  const signIndent = ' '.repeat(indentSize - 2)
  const plainIndent = ' '.repeat(indentSize)

  const lines = diff.flatMap((item) => {
    switch (item.type) {
      case 'nested':
        return `${plainIndent}${item.key}: {\n${stylish(item.children, depth + 1)}\n${plainIndent}}`

      case 'added':
        return `${signIndent}+ ${item.key}: ${formatValue(item.value, depth + 1)}`

      case 'removed':
        return `${signIndent}- ${item.key}: ${formatValue(item.value, depth + 1)}`

      case 'unchanged':
        return `${plainIndent}${item.key}: ${formatValue(item.value, depth + 1)}`

      case 'changed':
        return [
          `${signIndent}- ${item.key}: ${formatValue(item.oldValue, depth + 1)}`,
          `${signIndent}+ ${item.key}: ${formatValue(item.newValue, depth + 1)}`
        ]

      default:
        return []
    }
  })

  return lines.join('\n')
}

const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }

  const indentSize = depth * 4
  const indent = ' '.repeat(indentSize)
  const bracketIndent = ' '.repeat(indentSize - 4)

  const entries = Object.entries(value).map(([key, val]) => {
    return `${indent}${key}: ${formatValue(val, depth + 1)}`
  })

  return `{\n${entries.join('\n')}\n${bracketIndent}}`
}

export default (diff) => `{\n${stylish(diff, 1)}\n}`
