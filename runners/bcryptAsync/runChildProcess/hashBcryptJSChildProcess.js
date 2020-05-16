const bcrypt = require('bcryptjs');

const file = require('../../../helpers/file');

const processNumber = Number(process.argv[2]);
const start = 20 * processNumber;
const end = start + 20;

const hashPromise = (i) => async () => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(file[i], salt);
};

(async () => {
  const tasks = [];
  for (let i = start; i < end; i++) {
    tasks.push(hashPromise(i));
  }
  await Promise.all(tasks.map((task) => task()));
})();