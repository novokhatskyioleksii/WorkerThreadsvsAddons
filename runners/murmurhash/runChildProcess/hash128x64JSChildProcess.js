const murmurHash3 = require('murmurhash3js');

const file = require('../../../helpers/file');

const processNumber = Number(process.argv[2]);
const start = 200000 * processNumber;
const end = start + 200000;

(() => {
  for (let i = start; i < end; i++) {
    const hash = murmurHash3.x64.hash128(file[i]);
  }
})();