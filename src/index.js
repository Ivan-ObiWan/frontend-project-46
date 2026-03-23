import parseFile from './parsers.js'
import buildDiff from './diffBuilder.js'
import getFormatter from './formatters/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = buildDiff(data1, data2)
  return getFormatter(diff, format)
}

export default genDiff
