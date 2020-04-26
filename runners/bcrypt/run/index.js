const file = require('../../../helpers/file');

const { filterOutliers, getMean, getSD } = require('../../../helpers/calc');

const check = require('../check');
const hashBcryptC = require('./hashBcryptC');
const hashBcryptJS = require('./hashBcryptJS');

const checkTime = check();

const { result: resC, total: totalC } = hashBcryptC();
const { result: resJS, total: totalJS } = hashBcryptJS();

const filteredC = filterOutliers(resC);
const filteredJS = filterOutliers(resJS);

const meanC = getMean(filteredC);
const meanJS = getMean(filteredJS);

const SDC = getSD(filteredC);
const SDJS = getSD(filteredJS);

console.log(`C++ Total: ${((totalC - checkTime) / 1000).toFixed(2)} milliseconds`);
console.log(`JS Total: ${((totalJS - checkTime) / 1000).toFixed(2)} milliseconds`);

console.log(`C++: ${meanC.toFixed(2)} +- ${SDC.toFixed(2)} microseconds`);
console.log(`JS: ${meanJS.toFixed(2)} +- ${SDJS.toFixed(2)} microseconds`);

process.exit();