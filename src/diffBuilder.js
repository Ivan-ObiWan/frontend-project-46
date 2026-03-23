import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2))
  const sortedKeys = _.sortBy(keys)

  return sortedKeys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2),
      }
    }

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 }
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 }
    }
    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 }
    }
    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    }
  })
}

export default buildDiff
