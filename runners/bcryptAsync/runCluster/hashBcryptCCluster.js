const bcrypt = require('bcrypt');

const file = require('../../../helpers/file');

const hashPromise = (i) => async () => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(file[i], salt);
};

const hashBcryptCCluster = async () => {
  const tasks = [];
  for (let i = 0; i < 140; i++) {
    tasks.push(hashPromise(i));
  }
  await Promise.all(tasks.map((task) => task()));
};

module.exports = hashBcryptCCluster;