const argon2 = require('argon2-browser');

const microseconds = require('microseconds');

const file = require('../../../helpers/file');

const hashPromise = (i) => async () => {
  const salt = new Uint8Array(16);
  const hash = await argon2.hash({
    pass: file[i],
    salt,
    time: 256,
    mem: 512,
    hashLen: 32,
    parallelism: 1,
    type: argon2.ArgonType.Argon2d,
  });
};

const hashArgon2JS = async () => {
  const tasks = [];
  for (let i = 0; i < 14; i++) {
    tasks.push(hashPromise(i));
  }

  const beforeAll = microseconds.now();

  await Promise.all(tasks.map((task) => task()));

  const afterAll = beforeAll + microseconds.since(beforeAll);

  return afterAll - beforeAll;
};

module.exports = hashArgon2JS;