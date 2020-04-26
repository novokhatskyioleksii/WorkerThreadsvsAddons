const bcrypt = require('bcrypt');

const microseconds = require('microseconds');

const file = require('../../../helpers/file');

const hashBcryptC = () => {
  const result = [];

  const beforeAll = microseconds.now();
  for (let i = 0; i < 140; i++) {
    const before = microseconds.now();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(file[i], salt);
    const after = before + microseconds.since(before);
    result.push(after - before);
  }
  const afterAll = beforeAll + microseconds.since(beforeAll);

  return { result, total: afterAll - beforeAll };
};

module.exports = hashBcryptC;