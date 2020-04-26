const bcrypt = require('bcryptjs');

const file = require('../../../helpers/file');

const hashBcryptJSWorkerThreads = (processNumber) => {
  const start = 20 * processNumber;
  const end = start + 20;

  for (let i = start; i < end; i++) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(file[i], salt);
  }
};

module.exports = hashBcryptJSWorkerThreads;