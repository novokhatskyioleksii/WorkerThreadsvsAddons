const jsonnetC = require('./jsonnetC');
const jsonnetJS = require('./jsonnetJS');

const totalC = jsonnetC();
const totalJS = jsonnetJS();

console.log(`(jsonnet) C++ Total: ${((totalC) / 1000).toFixed(2)} milliseconds`);
console.log(`(jsonnet) JS Total: ${((totalJS) / 1000).toFixed(2)} milliseconds`);

process.exit();