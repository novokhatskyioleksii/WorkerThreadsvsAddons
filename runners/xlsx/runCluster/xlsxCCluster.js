const xlsx = require('xlsx-util');

const xlsxCCluster = async () => {
  const array = [...Array(7).keys()];
  await Promise.all(array.map((i) => xlsx.readFile(`./helpers/examples/file_example_XLSX_5000 (${i}).xlsx`)));
};

module.exports = xlsxCCluster;