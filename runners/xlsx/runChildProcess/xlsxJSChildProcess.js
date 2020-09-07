const xlsx = require('xlsx');

const processNumber = Number(process.argv[2]);

(async () => xlsx.readFile(`./helpers/examples/file_example_XLSX_5000 (${processNumber}).xlsx`))();