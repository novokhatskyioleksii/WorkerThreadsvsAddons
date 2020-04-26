const bcrypt = require('bcrypt');

const file = require('../../../helpers/file');

const hashBcryptCChildProcess = () => {
  for (let i = 0; i < 140; i++) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(file[i], salt);
  }
};

module.exports = hashBcryptCChildProcess;