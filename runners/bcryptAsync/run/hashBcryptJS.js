const bcrypt = require('bcryptjs');

const microseconds = require('microseconds');

const file = require('../../../helpers/file');

const hashPromise = (i) => async () => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(file[i], salt);
};

const hashBcryptJS = async () => {
  const tasks = [];
  for (let i = 0; i < 140; i++) {
    tasks.push(hashPromise(i));
  }

  const beforeAll = microseconds.now();

  await Promise.all(tasks.map((task) => task()));

  const afterAll = beforeAll + microseconds.since(beforeAll);

  return afterAll - beforeAll;
};

module.exports = hashBcryptJS;