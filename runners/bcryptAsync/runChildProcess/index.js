const microseconds = require('microseconds');
const { spawn } = require('child_process');

const file = require('../../../helpers/file');

const hashBcryptCChildProcess = require('./hashBcryptCChildProcess');

(async () => {
  let count = 0;
  let beforeC;
  let afterC;
  let beforeJS;
  let afterJS;

  beforeC = microseconds.now();
  await hashBcryptCChildProcess();
  afterC = beforeC + microseconds.since(beforeC);

  const hashBcryptJSChildProcess = (i) => new Promise((resolve, reject) => {
    const hashBcryptJSChildProcess = spawn('node', ['./runners/bcryptAsync/runChildProcess/hashBcryptJSChildProcess.js', i]);

    hashBcryptJSChildProcess.stdout.on('data', data => {
      console.log(data.toString());
    });

    hashBcryptJSChildProcess.stderr.on('data', (err) => {
      console.error(err.toString());
    });

    hashBcryptJSChildProcess.stdout.on('close', () => {
      count++;
      if (count === 7) afterJS = beforeJS + microseconds.since(beforeJS);
      resolve();
    });
  });
  beforeJS = microseconds.now();
  await Promise.all([
    hashBcryptJSChildProcess(0),
    hashBcryptJSChildProcess(1),
    hashBcryptJSChildProcess(2),
    hashBcryptJSChildProcess(3),
    hashBcryptJSChildProcess(4),
    hashBcryptJSChildProcess(5),
    hashBcryptJSChildProcess(6),
    // hashBcryptJSChildProcess(7),
  ]);

  const totalC = afterC - beforeC;
  const totalJS = afterJS - beforeJS;

  console.log(`(bcrypt) C++ Total: ${(totalC / 1000).toFixed(2)} milliseconds`);
  console.log(`(bcrypt) JS Total: ${(totalJS / 1000).toFixed(2)} milliseconds`);

  process.exit();
})();