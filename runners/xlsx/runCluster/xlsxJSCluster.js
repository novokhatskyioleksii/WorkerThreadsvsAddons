const xlsx = require('xlsx');

const xlsxJSCluster = async (processNumber) => {
  await xlsx.readFile(`./helpers/examples/file_example_XLSX_5000 (${processNumber}).xlsx`);
};

module.exports = xlsxJSCluster;