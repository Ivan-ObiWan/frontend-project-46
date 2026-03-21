import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatters = {
  stylish,
  plain,
  json,
}

export default (diff, format) => {
  const formatter = formatters[format]
  if (!formatter) {
    throw new Error(`Unknown format: ${format}. Supported formats; stylish, plain, json`)
  }
  return formatter(diff)
}
