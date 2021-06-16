(async () => {
  const file = require('../../../helpers/file');

  const hashArgon2C = require('./hashArgon2C');
  const hashArgon2JS = require('./hashArgon2JS');

  const totalC = await hashArgon2C();
  const totalJS = await hashArgon2JS();

  console.log(`(argon2) C++ Total: ${((totalC) / 1000).toFixed(2)} milliseconds`);
  console.log(`(argon2) JS Total: ${((totalJS) / 1000).toFixed(2)} milliseconds`);

  process.exit();
})();