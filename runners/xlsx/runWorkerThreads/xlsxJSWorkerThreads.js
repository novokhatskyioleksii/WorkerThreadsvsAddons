const xlsx = require('xlsx');

const xlsxJSWorkerThreads = async (processNumber) => {
  await xlsx.readFile(`./helpers/examples/file_example_XLSX_5000 (${processNumber}).xlsx`);
};

module.exports = xlsxJSWorkerThreads;