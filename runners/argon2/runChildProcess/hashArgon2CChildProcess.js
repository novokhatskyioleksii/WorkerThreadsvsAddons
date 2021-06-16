const { argon2d } = require('hash-wasm');

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

const hashArgon2CChildProcess = async () => {
  const tasks = [];
  for (let i = 0; i < 14; i++) {
    tasks.push(hashPromise(i));
  }
  await Promise.all(tasks.map((task) => task()));
};

module.exports = hashArgon2CChildProcess;