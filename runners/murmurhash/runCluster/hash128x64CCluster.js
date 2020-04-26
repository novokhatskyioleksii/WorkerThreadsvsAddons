const { murmurHash128x64 } = require('murmurhash-native');

const file = require('../../../helpers/file');

const hash128x64C = () => {
  for (let i = 0; i < 1400000; i++) {
    const hash = murmurHash128x64(file[i]);
  }
};

module.exports = hash128x64C;