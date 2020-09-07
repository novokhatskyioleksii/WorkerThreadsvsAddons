const xlsx = require('xlsx');

const microseconds = require('microseconds');

const xlsxJS = async () => {
  const array = [...Array(7).keys()];
  const before = microseconds.now();
  await Promise.all(array.map((i) => xlsx.readFile(`./helpers/examples/file_example_XLSX_5000 (${i}).xlsx`)));
  const after = before + microseconds.since(before);

  return after - before;
};

module.exports = xlsxJS;