import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  console.log('File 1:', data1);
  console.log('File 2:', data2);
  console.log(`Format: ${format}`);

  return 'Difference will be shown here';
};

export default genDiff;
