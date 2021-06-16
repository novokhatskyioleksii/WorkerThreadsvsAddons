const argon2 = require('argon2-browser');

const file = require('../../../helpers/file');

const processNumber = Number(process.argv[2]);
const start = 2 * processNumber;
const end = start + 2;

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

(async () => {
  const tasks = [];
  for (let i = start; i < end; i++) {
    tasks.push(hashPromise(i));
  }
  await Promise.all(tasks.map((task) => task()));
})();