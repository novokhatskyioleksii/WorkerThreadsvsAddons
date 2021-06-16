const { argon2d } = require('hash-wasm');

const microseconds = require('microseconds');

const file = require('../../../helpers/file');

const hashPromise = (i) => async () => {
  const salt = new Uint8Array(16);
  const hash = await argon2d({
    password: file[i],
    salt,
    parallelism: 1,
    iterations: 256,
    memorySize: 512,
    hashLength: 32,
  });
};

const hashArgon2C = async () => {
  const tasks = [];
  for (let i = 0; i < 14; i++) {
    tasks.push(hashPromise(i));
  }

  const beforeAll = microseconds.now();

  await Promise.all(tasks.map((task) => task()));

  const afterAll = beforeAll + microseconds.since(beforeAll);

  return afterAll - beforeAll;
};

module.exports = hashArgon2C;