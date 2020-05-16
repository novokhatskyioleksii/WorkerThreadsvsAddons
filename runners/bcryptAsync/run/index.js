(async () => {
  const file = require('../../../helpers/file');

  const check = require('../check');
  const hashBcryptC = require('./hashBcryptC');
  const hashBcryptJS = require('./hashBcryptJS');

  const checkTime = check();

  const totalC = await hashBcryptC();
  const totalJS = await hashBcryptJS();

  console.log(`(bcrypt) C++ Total: ${((totalC - checkTime) / 1000).toFixed(2)} milliseconds`);
  console.log(`(bcrypt) JS Total: ${((totalJS - checkTime) / 1000).toFixed(2)} milliseconds`);

  process.exit();
})();