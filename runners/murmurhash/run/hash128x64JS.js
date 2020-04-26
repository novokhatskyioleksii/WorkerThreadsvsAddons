const murmurHash3 = require('murmurhash3js');

const microseconds = require('microseconds');

const file = require('../../../helpers/file');

const hash128x64JS = () => {
  const result = [];

  const beforeAll = microseconds.now();
  for (let i = 0; i < 1400000; i++) {
    const before = microseconds.now();
    const hash = murmurHash3.x64.hash128(file[i]);
    const after = before + microseconds.since(before);
    result.push(after - before);
  }
  const afterAll = beforeAll + microseconds.since(beforeAll);

  return { result, total: afterAll - beforeAll };
};

module.exports = hash128x64JS;